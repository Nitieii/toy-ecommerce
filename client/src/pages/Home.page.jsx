import React, { useEffect } from "react";
import { useCategory } from "../hooks";
import Categories from "../components/category/categories";
import Spinner from "../components/spinner/spinner";

const HomePage = () => {
  const { categories, loading, getCategories } = useCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories();
    };

    fetchCategories();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="products-catagories-area clearfix">
      <div className="amado-catagory">
        <Categories categories={categories} />
      </div>
    </div>
  );
};

export default HomePage;
