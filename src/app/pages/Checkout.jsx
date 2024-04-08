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
  myData["merchant_id"] = "10000100";
  myData["merchant_key"] = "46f0cd694581a";
  // myData["return_url"] = "http://www.yourdomain.co.za/return_url";
  // myData["cancel_url"] = "http://www.yourdomain.co.za/cancel_url";
  // myData["notify_url"] = "http://www.yourdomain.co.za/notify_url";
  // Buyer details
  myData["name_first"] = "Ruhama ";
  myData["name_last"] = "Gull";
  myData["email_address"] = "test@test.com";
  // Transaction details
  myData["m_payment_id"] = "000001";
  myData["amount"] = `${totalPrice}`;
  myData["item_name"] = "000001";

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

      {/* <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
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

{/* {htmlForm} */}
    </div>
  );
};

export default Checkout;