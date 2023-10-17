import { Transaction } from "../../../store/slices/TransactionSlice";



const TransactionDetail = (props:{transaction: Transaction} ) => {

    const { transaction } = props;
    return (
        <div className='' >
            <h2>Transaction Details</h2>

            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Order Id</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{transaction?.id}</th>
                        <td>{transaction?.orderId}</td>
                        <td>{transaction?.type}</td>
                        <td>{transaction?.amount}</td>
                        <td>{transaction?.paymentMethod}</td>
                        <td>{transaction?.status}</td>
                        <td>{transaction?.timestamp}</td>
                    </tr>
               
                </tbody>
            </table>
        </div>

        
    );
};

export default TransactionDetail;
