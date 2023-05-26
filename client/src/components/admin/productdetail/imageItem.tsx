const ImageItem = (props: { url: string; onRemove: () => void }) => {
  const { url, onRemove } = props;

  return (
    <div className='col-md-3' key={url}>
      <img src={url} alt={'image-product'} className='img-thumbnail' />
      <span className='remove-icon' onClick={onRemove}>
        &times;
      </span>
    </div>
  );
};

export default ImageItem;
