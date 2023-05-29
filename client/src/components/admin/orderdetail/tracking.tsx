import '../../../assets/css/order-tracking.css';

const Tracking = (props: { status: string }) => {
  const { status } = props;

  return (
    <div className='track' id='track'>
      <div className={`step ${status === 'confirmed' ? 'active' : ''}`}>
        <span className='icon'>
          {' '}
          <i className='fa fa-check'></i>{' '}
        </span>
        <span className='text'>Order confirmed</span>
      </div>
      <div className='step'>
        <span className='icon'>
          {' '}
          <i className='fa fa-truck'></i>{' '}
        </span>
        <span className='text'>Order shipped</span>
      </div>
      <div className='step'>
        <span className='icon'>
          {' '}
          <i className='fa fa-archive'></i>{' '}
        </span>
        <span className='text'>Order delivered</span>
      </div>
    </div>
  );
};

export default Tracking;
