import TransactionDetail from '../../components/admin/transactiondetail/transactiondetail';
import { useTransaction } from '../../hooks';
import Spinner from '../../components/layouts/spinner/spinner';
import { useEffect } from 'react';


const TransactionDetailPage = () => {
    // Implement the component logic here
    const {  transaction, loadingTransaction,handleGetTransactionById } = useTransaction();

    const transactionId = window.location.pathname.split('/')[3];

    useEffect(() => {
        // Fetch the data here
        handleGetTransactionById(transactionId);
    }, []);

    if (loadingTransaction) return <Spinner />;

    return (
        // Render the component UI here
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <TransactionDetail transaction={transaction} />
        </div>
    );
};

export default TransactionDetailPage;
