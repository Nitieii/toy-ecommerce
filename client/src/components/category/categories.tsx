import React from "react";
import CategoryItem from "./categoryItem";
import { Category } from "../../store/slices/CategorySlice";

function Categories(props: { categories: Category[] }) {
  return (
    <div
      className="amado-pro-catagory clearfix"
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {props.categories
        ? props.categories.map((item: Category) => (
            <CategoryItem key={item._id} {...item} />
          ))
        : null}
    </div>
  );
}

export default Categories;
