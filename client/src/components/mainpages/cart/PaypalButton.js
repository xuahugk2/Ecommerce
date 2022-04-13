import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class PaypalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
            this.props.tranSuccess(payment)
        }
 
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
 
        const onError = (err) => {
            console.log("Error!", err);
        }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = this.props.total; 
 
        const client = {
            sandbox:    'ASFrfWIQ4oULnykpDo0BF18GCCu3QXfUnm1w-ll2mNJ4RovO3K2Z2VFUXVZqhWJZ22feToBQUWmr1jal',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        let style = {
            size: 'small',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
            tagline: false
        }
        
        return (
            <PaypalExpressBtn
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} 
                style={style}
            />
        );
    }
}