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
}) => {
  const { tableName, data, totalLength, onPageChange, loading } = props;

  let columns: Column[] = [];

  if (tableName === 'products') {
    columns = [
      { name: 'id', selector: (row) => row._id },
      { name: 'name', selector: (row) => row.name },
      { name: 'price', selector: (row) => row.price },
      { name: 'quantity', selector: (row) => row.quantity },
      { name: 'category', selector: (row) => row.category },
    ];
  } else if (tableName === 'orders') {
    columns = [
      {
        name: 'id',
        selector: (row) => row._id,
      },
      {
        name: 'total',
        selector: (row) => row.totalPrice,
      },
      {
        name: 'status',
        selector: (row) => row.isPaid,
      },
    ];
  } else if (tableName === 'users') {
    columns = [
      {
        name: 'id',
        selector: (row) => row._id,
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
        selector: (row) => (row.is_admin ? 'admin' : 'user'),
      },
    ];
  }

  console.log('data', data);

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
            : 'Users'}{' '}
          Dashboard
        </h2>
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
            window.location.href = `/admin/products/${row._id}`;
          }
        }}
      />
    </div>
  );
};
export default DataTables;
