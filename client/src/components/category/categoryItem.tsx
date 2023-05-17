import * as URL from "../../routes/url";
import { Category } from "../../store/slices/CategorySlice";

function CategoryItem(props: Category) {
  const item = props;

  console.log("CategoryItem: ", item);

  return (
    <div key={item._id} className="single-products-catagory clearfix">
      <a href={`${URL.DETAILS}/${item._id}`}>
        <img
          src={`${item.categoryImg}`}
          alt=""
          style={{ marginTop: "200px" }}
          loading="lazy"
        />
        <div className="hover-content">
          <div className="line"></div>
          <p>From ${item.priceMin}</p>
          <h4>{item._id}</h4>
        </div>
      </a>
    </div>
  );
}

export default CategoryItem;
