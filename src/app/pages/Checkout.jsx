// 'use client'

// import { useState } from 'react';
// const crypto = require("crypto");
// const Checkout = () => {
//   // Dummy data
//   const [products] = useState([
//     { id: 1, name: 'Product 1', price: 10 },
//     { id: 2, name: 'Product 2', price: 20 },
//     { id: 3, name: 'Product 3', price: 30 }
//   ]);

//   // Calculate total price
//   const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);



//   ////////////// create signature 

//   const generateSignature = (data, passPhrase = null) => {
//     // Create parameter string
//     let pfOutput = "";
//     for (let key in data) {
//       if (data.hasOwnProperty(key)) {
//         const value = data[key];
//         if (value) { // Check if value is not null or undefined
//           const trimmedValue = (typeof value === 'string') ? value.trim() : value;
//           pfOutput += `${key}=${encodeURIComponent(trimmedValue).replace(/%20/g, "+")}&`;
//         }
//       }
//     }
//     // Remove last ampersand
//     let getString = pfOutput.slice(0, -1);
//     if (passPhrase !== null) {
//       getString += `&passphrase=${encodeURIComponent(passPhrase?.trim()).replace(/%20/g, "+")}`;
//     }

//     return crypto.createHash("md5").update(getString).digest("hex");
//   };


//   const myData = [];
//   // Merchant details
//   myData["merchant_id"] = "10000100";
//   myData["merchant_key"] = "46f0cd694581a";
//   myData["return_url"] = "http://localhost:3000/pages/success";
//   myData["cancel_url"] = "http://localhost:3000/pages/cancel";
//   myData["notify_url"] = "http://localhost:3000/pages/notify";
//   // Buyer details
//   myData["name_first"] = "Ruhama ";
//   myData["name_last"] = "Gull";
//   //We have sent a receipt of your payment to sbtu01@payfast.co.za
//   // myData["email_address"] = "abdullah.320409@gmail.com";
//   myData["email_address"] = "malikruhama7@gmail.com";
//   // myData["cell_number"] = "+92478048916";
//   // Transaction details
//   myData["m_payment_id"] = "000001";
//   myData["amount"] = `${totalPrice}`;
//   myData["item_name"] = "000001";


//   ////////////////// recurring
//   myData["subscription_type"] = "1";
//   myData["billing_date"] = "2024-04-08";
//   myData["recurring_amount"] = "800";
//   myData["frequency"] = "3";
//   myData["cycles"] = "12";
//   // myData["subscription_notify_email"] = "malikruhama7@gmail.com";
//   // myData["token"] = "dc0521d3-55fe-269b-fa00-b647310d760f";

//   // Generate signature
//   const myPassphrase = "jt7NOE43FZPn";
//   myData["signature"] = generateSignature(myData, myPassphrase);

//   let htmlForm = `<form action="https://sandbox.payfast.co.za​/eng/process" method="post">`;
//   for (let key in myData) {
//     if (myData.hasOwnProperty(key)) {
//       const value = myData[key];
//       if (typeof value === 'string' && value.trim() !== "") { // Check if value is a non-empty string
//         htmlForm += `<input name="${key}" type="hidden" value="${value.trim()}" />`;
//       }
//     }
//   }

//   htmlForm += `<input type="submit" className='button' /></form>`;
//   return (
//     <div className="checkout-container">
//       <h1>Checkout Page</h1>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             {product.name}: ${product.price}
//           </li>
//         ))}
//       </ul>
//       <div className="total-price">
//         Total Price: ${totalPrice}
//       </div>
//       {/* <input type="hidden" name="return_url" value="http://localhost:3000/success"/>
// <input type="hidden" name="cancel_url" value="http://localhost:3000/cancel"/>
// <input type="hidden" name="notify_url" value="http://localhost:3000/notify"/> */}
// {/* 
//       <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
//         <input type="hidden" name="merchant_id" value="10000100" />
//         <input type="hidden" name="merchant_key" value="46f0cd694581a" />
//         <input type="hidden" name="amount" value={totalPrice} />
//         <input type="hidden" name="item_name" value="000001" />
//   <input type="submit" className='button' />
//       </form> */}

//       <style jsx>{`
//         .checkout-container {
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//         }
//         .total-price {
//           margin-top: 20px;
//           font-weight: bold;
//         }
//         .button {
//           margin-top: 20px;
//           padding: 10px 20px;
//           background-color: #007bff;
//           color: #fff;
//           border: none;
//           cursor: pointer;
//           border-radius: 5px;
//         }
//         .button:hover {
//           background-color: #0056b3;
//         }
//       `}</style>
//       <div dangerouslySetInnerHTML={{ __html: htmlForm }} />
//       {/* <a href="https://www.payfast.co.za/eng/process/recurring/update/6a39d55b11839f6309d7f55a62998f8b?return=http://store.example.com">Update the card for your subscription</a> */}
//       <a href="https://www.payfast.co.za/eng/process/recurring/update/6a39d55b11839f6309d7f55a62998f8b?return=http://store.example.com">Update the card for your subscription</a>
//       {/* {htmlForm} */}
//     </div>
//   );
// };

// export default Checkout;




'use client'

import { useState } from 'react';
const crypto = require("crypto");
const Checkout = () => {
  // Dummy data
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]);

  // Calculate total price
  const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);



  ////////////// create signature 

  const generateSignature = (data, passPhrase = null) => {
    // Create parameter string
    let pfOutput = "";
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (value) { // Check if value is not null or undefined
          const trimmedValue = (typeof value === 'string') ? value.trim() : value;
          pfOutput += `${key}=${encodeURIComponent(trimmedValue).replace(/%20/g, "+")}&`;
        }
      }
    }
    // Remove last ampersand
    let getString = pfOutput.slice(0, -1);
    if (passPhrase !== null) {
      getString += `&passphrase=${encodeURIComponent(passPhrase?.trim()).replace(/%20/g, "+")}`;
    }

    return crypto.createHash("md5").update(getString).digest("hex");
  };


  const myData = [];
  // Merchant details
  myData["merchant_id"] = "10033229";
  myData["merchant_key"] = "3443z1kn5tapy";
  myData["return_url"] = "http://localhost:3000/pages/success";
  myData["cancel_url"] = "http://localhost:3000/pages/cancel";
  myData["notify_url"] = "http://localhost:3000/pages/notify";
  // Buyer details
  myData["name_first"] = "Ruhama ";
  myData["name_last"] = "Gull";
  //We have sent a receipt of your payment to sbtu01@payfast.co.za
  // myData["email_address"] = "abdullah.320409@gmail.com";
  myData["email_address"] = "projectzone734@gmail.com";
  // myData["cell_number"] = "+92478048916";
  // Transaction details
  myData["m_payment_id"] = "000001";
  myData["amount"] = `${totalPrice}`;
  myData["item_name"] = "000001";


  //////////////// recurring
  // myData["subscription_type"] = "1"; // subscription
  myData["subscription_type"] = "2"; // tokenization
  myData["billing_date"] = "2024-04-08";
  myData["recurring_amount"] = "800";
  myData["frequency"] = "3";
  myData["cycles"] = "12";
  // myData["subscription_notify_email"] = "malikruhama7@gmail.com";
  // myData["token"] = "dc0521d3-55fe-269b-fa00-b647310d760f";

  // Generate signature
  const myPassphrase = "jt7NOE43FZPn";
  myData["signature"] = generateSignature(myData, myPassphrase);

  let htmlForm = `<form action="https://sandbox.payfast.co.za​/eng/process" method="post">`;
  for (let key in myData) {
    if (myData.hasOwnProperty(key)) {
      const value = myData[key];
      if (typeof value === 'string' && value.trim() !== "") { // Check if value is a non-empty string
        htmlForm += `<input name="${key}" type="hidden" value="${value.trim()}" />`;
      }
    }
  }

  htmlForm += `<input type="submit" className='button' /></form>`;
  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}: ${product.price}
          </li>
        ))}
      </ul>
      <div className="total-price">
        Total Price: ${totalPrice}
      </div>
      {/* <input type="hidden" name="return_url" value="http://localhost:3000/success"/>
<input type="hidden" name="cancel_url" value="http://localhost:3000/cancel"/>
<input type="hidden" name="notify_url" value="http://localhost:3000/notify"/> */}
{/* 
      <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
        <input type="hidden" name="merchant_id" value="10000100" />
        <input type="hidden" name="merchant_key" value="46f0cd694581a" />
        <input type="hidden" name="amount" value={totalPrice} />
        <input type="hidden" name="item_name" value="000001" />
  <input type="submit" className='button' />
      </form> */}

      <style jsx>{`
        .checkout-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .total-price {
          margin-top: 20px;
          font-weight: bold;
        }
        .button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .button:hover {
          background-color: #0056b3;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: htmlForm }} />
      {/* <a href="https://www.payfast.co.za/eng/process/recurring/update/6a39d55b11839f6309d7f55a62998f8b?return=http://store.example.com">Update the card for your subscription</a> */}
      <a href="https://www.payfast.co.za/eng/recurring/update/f2a3479c-8ffc-40ec-a92e-e1bda7028bcd	">Update the card for your subscription</a>      {/* {htmlForm} */}
    </div>
  );
};

export default Checkout;




