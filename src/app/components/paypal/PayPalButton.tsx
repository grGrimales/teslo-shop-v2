

'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { SetTransactionId } from '@/actions/payments/set-transaction-id';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

 

  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
    
    const details = await actions.order?.capture();
    if ( !details ) return;

    // await paypalCheckPayment( details.id );

  }
  if ( isPending ) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<any> => {

    const rountedAmount = (Math.round(amount * 100)) / 100; //123.23
    const transactionId = await actions.order.create({
      purchase_units: [
        {
         
         invoice_id: orderId,
          amount: {
            value: `${ rountedAmount }`,
          }

        }
      ]
    });

     const { ok } = await SetTransactionId( orderId, transactionId );
     if ( !ok ) {
      throw new Error('No se pudo actualizar la orden');
    }

    console.log(transactionId);
    return transactionId;
  }
  return (
   <PayPalButtons
   createOrder={ createOrder }
   onApprove={ onApprove }
   />
  )
}
