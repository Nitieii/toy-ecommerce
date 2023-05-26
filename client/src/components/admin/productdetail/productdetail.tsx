import { useState } from 'react';
import { Product } from '../../../store/slices/ProductsSlice.ts';
import { Category } from '../../../store/slices/CategorySlice.ts';
import { useProduct } from '../../../hooks';
import ImageItem from './imageItem';

const ProductDetailAdmin = (props: {
  product: Product;
  categories: Category[];
}) => {
  const { product, categories } = props;

  const { handleUpdateProduct } = useProduct();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [keptImages, setKeptImages] = useState<string[]>(product.images);
  const [uploadImages, setUploadImages] = useState([] as any);
  const [images, setImages] = useState([] as any);

  const handleSubmit = () => {
    const form = new FormData();

    form.append('name', name);
    form.append('price', String(price));
    form.append('quantity', String(quantity));
    form.append('category', String(category));
    form.append('description', description);

    images.map((image: any) => form.append('images', image));

    keptImages.map((image) => form.append('keptImages[]', image));

    handleUpdateProduct(product._id, form);
  };

  const handleOnChangeImages = (e: any) => {
    const files = Array.from(e.target.files);

    images.push(...files);

    // Clear the existing images array
    const newImages = [...files.map((file: any) => URL.createObjectURL(file))];

    setUploadImages([...uploadImages, ...newImages]);
  };

  const handleRemoveImage = (imageType: string, index: number) => {
    if (imageType === 'keptImages') {
      setKeptImages((prevImages: string[]) =>
        prevImages.filter((_, i) => i !== index)
      );
    } else {
      setUploadImages((prevImages: string[]) =>
        prevImages.filter((_, i) => i !== index)
      );
      setImages((prevImages: any[]) => {
        const newImages = [...prevImages];
        newImages.splice(index, 1);
        return newImages;
      });
    }
  };

  return (
    <div className='cart-table-area section-padding-100'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-lg-8'>
            <div className='cart-title mt-50'>
              <h2 id='product-title'>{product.name}</h2>
            </div>

            <div className='col-md-12'>
              <form action='' id='productform' encType='multipart/form-data'>
                <div className='form-group'>
                  <label htmlFor='id' id='product_id_label'>
                    ID (cannot change this field)
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='product_id'
                    name='id'
                    value={product._id}
                    readOnly
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='fullName'>Product Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='product_name'
                    id='product_name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='price'>Price ( $ )</label>
                      <input
                        type='number'
                        className='form-control'
                        name='product_price'
                        id='price'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='product_quantity'>Quantity</label>
                      <input
                        type='number'
                        className='form-control'
                        name='product_quantity'
                        id='quantity'
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </div>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='category'>Category</label>

                  <select
                    className='form-control'
                    name='category'
                    id='category'
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    {categories?.map((category: any) => (
                      <option key={category._id} value={category._id}>
                        {category._id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    className='form-control'
                    name='description'
                    id='description'
                    rows={7}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className='form-group'>
                  <label htmlFor='images'>Images</label>
                  <input
                    type='file'
                    className='form-control-file'
                    name='images'
                    id='images-input'
                    multiple
                    accept='image/*'
                    onChange={(e) => handleOnChangeImages(e)}
                  />
                </div>

                <div className='images-container' id='images-container'>
                  <div className='row'>
                    {keptImages.map((img, index) => (
                      <ImageItem
                        url={img}
                        onRemove={() => {
                          console.log('remove');
                          handleRemoveImage('keptImages', index);
                        }}
                      />
                    ))}

                    {uploadImages.map((img: string, index: number) => (
                      <ImageItem
                        url={img}
                        onRemove={() => {
                          handleRemoveImage('uploadImages', index);
                        }}
                      />
                    ))}
                  </div>

                  <div className='row'>
                    <div className='row mt-5'>
                      <div className='col'>
                        <button
                          type='submit'
                          className='btn amado-btn'
                          id='create-product'
                          onClick={handleSubmit}
                        >
                          Save change
                        </button>
                      </div>

                      <div className='col'>
                        <a
                          id='delete-btn'
                          className='btn amado-btn active'
                          // onClick='deleteProduct()'
                          style={{ color: 'white' }}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailAdmin;
