'use client'

import { useState } from 'react';

const Checkout = () => {
    // Dummy data
    const [products] = useState([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 }
    ]);

    // Calculate total price
    const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);

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

            <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
            <input type="hidden" name="merchant_id" value="10000100"/>
<input type="hidden" name="merchant_key" value="46f0cd694581a"/>
<input type="hidden" name="return_url" value="http://localhost:3000/success"/>
<input type="hidden" name="cancel_url" value="http://localhost:3000/cancel"/>
<input type="hidden" name="notify_url" value="http://localhost:3000/notify"/>
   <input type="hidden" name="amount" value={totalPrice}/>
   <input type="hidden" name="item_name" value="Test Product"/>
   <input type="submit" className='button'/>
</form>
            

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
        </div>
    );
};

export default Checkout;