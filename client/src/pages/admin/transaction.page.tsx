import DataTables from '../../components/admin/datatables/datatables';
import { useTransaction } from '../../hooks';
import { useEffect } from 'react';

const TransactionPage = () => {

    const {
        transactions,
        totalLength,
        loadingTransaction,
        handleGetTransactions,
        currentPage,
        totalPage,
        handleCurrentPage,
    } = useTransaction();
 

    useEffect(() => {
        handleGetTransactions(1);
    }, []);

    const handldePageChange = () => {
        if (currentPage + 1 > totalPage) return;
        handleCurrentPage(currentPage + 1);

        handleGetTransactions(currentPage);
    };

    return (
        <DataTables
            tableName={'transactions'}
            data={transactions}
            totalLength={totalLength}
            onPageChange={handldePageChange}
            loading={loadingTransaction}
            handleSearch={() => {
                console.log('search');
            }}
        />
    );
};

export default TransactionPage;
