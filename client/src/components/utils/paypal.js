import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
  state = {};
  render() {
    const onSuccess = (payment) => {
      //console.log(JSON.stringify(payment));

      this.props.onSuccess(payment);

      // {
      //     "paid":true,
      //     "cancelled":false,
      //     "payerID":"BP7VDQUB938UN",
      //     "paymentID":"PAYID-L4TK7QI5MT03877SH0580507",
      //     "paymentToken":"EC-4VU98554LH755115T",
      //     "returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L4TK7QI5MT03877SH0580507&token=EC-4VU98554LH755115T&PayerID=BP7VDQUB938UN",
      //     "address":
      //     {"recipient_name":"John Doe"
      //     ,"line1":"1 Main St",
      //     "city":"San Jose",
      //     "state":"CA",
      //     "postal_code":"95131",
      //     "country_code":"US"
      //     },
      // "email":"sb-ybql52810118@personal.example.com"
      // }
    };
    const onCancel = (data) => {
      console.log(JSON.stringify(data));
    };
    const onError = (er) => {
      console.log(JSON.stringify(er));
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "AfQ52gBfkrz1iClr8dYCn7VavkUe9ygmHTmiMaDXYEQCBW80pdzNbZhZae2j3Q8GoIj9tvsVF1Ipf-W9",
      production: "",
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout",
          }}
        />
      </div>
    );
  }
}

export default Paypal;
