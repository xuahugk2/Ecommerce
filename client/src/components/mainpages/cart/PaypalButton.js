import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalButton(props) {

    const { total, tranSuccess } = props;

    // const createOrder = (data, actions) => {
    //     return actions.order.create({
    //         purchase_units: {
    //             amount: {
    //                 value: total
    //             }
    //         }
    //     })
    // }

    return (
        <PayPalScriptProvider options={{ clientId: "ASFrfWIQ4oULnykpDo0BF18GCCu3QXfUnm1w-ll2mNJ4RovO3K2Z2VFUXVZqhWJZ22feToBQUWmr1jal" }}>
            <PayPalButtons
                onApprove={tranSuccess}
            // createOrder={createOrder}
            />
        </PayPalScriptProvider>
    );
}