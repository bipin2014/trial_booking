import React, { Component } from 'react'
import KhaltiCheckout from "khalti-web";


export default class CheckOut extends Component {

    
    render() {
        

        const checkoutBtn=()=>{
            let config = {
                // replace this key with yours
                "publicKey": "test_public_key_3cc04817a4d14c48b523bcc98b7e5066",
                "productIdentity": "1234567890",
                "productName": "Drogon",
                "productUrl": "http://gameofthrones.com/buy/Dragons",
                "eventHandler": {
                    onSuccess (payload) {
                        // hit merchant api for initiating verfication
                        console.log(payload);
                    },
                    // onError handler is optional
                    onError (error) {
                        // handle errors
                        console.log(error);
                    },
                    onClose () {
                        console.log('widget is closing');
                    }
                }
            };
            let checkout=new KhaltiCheckout(config);
            checkout.show({amount: 1000});
        }

        return (
            <div>
                <button onClick={checkoutBtn}>Checkout</button>
            </div>
        )
    }
}
