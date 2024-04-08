const axios = require("axios");
const crypto = require("crypto");
const dns = require('dns');

const page = () => {

  ////

  const ITN_Payload = {
    'm_payment_id': 'SuperUnique1',
    'pf_payment_id': '1089250',
    'payment_status': 'COMPLETE',
    'item_name': 'test+product',
    'item_description': 'test+description',
    'amount_gross': 200.00,
    'amount_fee': -4.60,
    'amount_net': 195.40,
    'custom_str1': '',
    'custom_str2': '',
    'custom_str3': '',
    'custom_str4': '',
    'custom_str5': '',
    'custom_int1': '',
    'custom_int2': '',
    'custom_int3': '',
    'custom_int4': '',
    'custom_int5': '',
    'name_first': '',
    'name_last': '',
    'email_address': '',
    'merchant_id': '10000100',
    'signature': 'ad8e7685c9522c24365d7ccea8cb3db7'
  };


  const testingMode = true;
const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

const pfData = JSON.parse(JSON.stringify(req.body));

let pfParamString = "";
for (let key in pfData) {
  if(pfData.hasOwnProperty(key) && key !== "signature"){
    pfParamString +=`${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}&`;
  }
}

// Remove last ampersand
pfParamString = pfParamString.slice(0, -1);
 

const pfValidSignature = (pfData, pfParamString, pfPassphrase = null ) => {
  // Calculate security signature
  let tempParamString = '';
  if (pfPassphrase !== null) {
    pfParamString +=`&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`;
  }

  const signature = crypto.createHash("md5").update(pfParamString).digest("hex");
  return pfData['signature'] === signature;
};

async function ipLookup(domain){
  return new Promise((resolve, reject) => {
    dns.lookup(domain, {all: true}, (err, address, family) => {
      if(err) {
        reject(err)
      } else {
        const addressIps = address.map(function (item) {
         return item.address;
        });
        resolve(addressIps);
      }
    });
  });
}

const pfValidIP = async (req) => {
  const validHosts = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za'
  ];

  let validIps = [];
  const pfIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try{
    for(let key in validHosts) {
      const ips = await ipLookup(validHosts[key]);
      validIps = [...validIps, ...ips];
    }
  } catch(err) {
    console.error(err);
  }

  const uniqueIps = [...new Set(validIps)];

  if (uniqueIps.includes(pfIp)) {
    return true;
  }
  return false;
};

const pfValidPaymentData = ( cartTotal, pfData ) => {
  return Math.abs(parseFloat(cartTotal) - parseFloat(pfData['amount_gross'])) <= 0.01;
};


const pfValidServerConfirmation = async (pfHost, pfParamString) => {
  const result = await axios.post(`https://sandbox.payfast.co.za​/eng/process/query/validate`, pfParamString)
      .then((res) => {
          return res.data;
      })
      .catch((error) => {
          console.error(error)
      });
 return result === 'VALID';
};

const check1 = pfValidSignature(pfData, pfParamString, passPhrase);
const check2 = pfValidIP(req);
const check3 = pfValidPaymentData( 60, pfData );
const check4 = pfValidServerConfirmation(pfHost, pfParamString);

if(check1 && check2 && check3 && check4) {
  return (
    <div>
      <h1>Notify Page</h1>

    </div>
  )
} else {
    // Some checks have failed, check payment manually and log for investigation
}
 
}

export default page
