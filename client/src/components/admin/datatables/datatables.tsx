import { useState } from 'react';
import DataTable from 'react-data-table-component';

interface Column {
  name: string;
  selector: (row: any) => any;
}

const DataTables = (props: {
  tableName: string;
  data: [];
  totalLength: number;
  onPageChange: any;
  loading: boolean;
  handleSearch: any;
}) => {
  const { tableName, data, totalLength, onPageChange, loading, handleSearch } =
    props;

  const [searchText, setSearchText] = useState('');

  let columns: Column[] = [];

  if (tableName === 'products') {
    columns = [
      { name: 'id', selector: (row) => row.id },
      { name: 'name', selector: (row) => row.name },
      { name: 'price', selector: (row) => row.price },
      { name: 'quantity', selector: (row) => row.quantity },
      { name: 'category', selector: (row) => row.category },
    ];
  } else if (tableName === 'orders') {
    columns = [
      {
        name: 'id',
        selector: (row) => row.id,
      },
      {
        name: 'total ($)',
        selector: (row) => row.totalCost,
      },
      {
        name: 'status',
        selector: (row) => row.status,
      },
      {
        name: 'created at',
        selector: (row) =>
          new Date(row.createdAt).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
      },
    ];
  } else if (tableName === 'users') {
    columns = [
      {
        name: 'id',
        selector: (row) => row.id,
      },
      {
        name: 'name',
        selector: (row) => row.fullname,
      },
      {
        name: 'email',
        selector: (row) => row.email,
      },
      {
        name: 'role',
        selector: (row) => (row.isAdmin ? 'admin' : 'user'),
      },
    ];
  }
  else if (tableName === 'transactions') {
    columns = [
      {
        name: 'id',
        selector: (row) => row.id,
      }, {
        name: 'order id',
        selector: (row) => row.orderId,
      },
      // {
      //   name: 'status',
      //   selector: (row) => row.status,
      // },
      {
        name: 'payment method',
        selector: (row) => row.paymentMethod,
      },
      {
        name: 'amount',
        selector: (row) => row.amount,
      },
      {
        name: 'type',
        selector: (row) => row.type
      },
      {
        name: 'created at',
        selector: (row) =>
          new Date(row.timestamp).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
      },
    ];
  }

  const handleSearchData = (e: any) => {
    setSearchText(e.target.value);

    handleSearch(e.target.value);
  };

  return (
    <div
      className='dashboard-table-area section-padding-100'
      style={{
        width: '70%',
      }}
    >
      <div className='cart-title mt-50'>
        <h2>
          {tableName === 'products'
            ? 'Products'
            : tableName === 'orders'
              ? 'Orders'
              : tableName === 'users'
                ? 'Users'
                : 'Transaction'}
          {' '}
          Dashboard
        </h2>

        <input
          type='text'
          placeholder={`Search ${tableName}`}
          value={searchText}
          onChange={(e) => handleSearchData(e)}
          style={{ marginTop: 5, marginBottom: 5, padding: 5, fontSize: 12 }}
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        striped
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={totalLength}
        progressPending={loading}
        onChangePage={onPageChange}
        onRowDoubleClicked={(row) => {
          if (tableName === 'products') {
            window.location.href = `/admin/products/${row.id}`;
          } else if (
            tableName === 'orders' &&
            window.location.href.includes('admin')
          ) {
            window.location.href = `/admin/orders/${row.id}`;
          } else if (tableName === 'orders') {
            window.location.href = `/orders/${row.id}`;
          } else if (
            tableName === 'users' &&
            window.location.href.includes('users')
          ) {
            window.location.href = `/admin/users/${row.id}`;
          } else if (
            tableName === 'transactions' &&
            window.location.href.includes('admin')
          ) {
            window.location.href = `/admin/transactions/${row.id}`;
          }
        }
        }
      />
    </div>
  );
};
export default DataTables;
