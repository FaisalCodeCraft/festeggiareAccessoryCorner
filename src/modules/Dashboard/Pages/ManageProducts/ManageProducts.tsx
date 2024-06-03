import React from "react";
import ProductCard from "./components/ProductCard/ProductCard";
import DashboardLayout from "DashboardLayout/DashboardLayout";
import FilterProducts from "./components/FilterProducts/FilterProducts";
import DashProductModal from "./components/DashProductModal/DashProductModal";
import { CARD_DATA } from "constants/contents/data";
import { getProducts } from "services/products";

const ManageProducts = () => {
  const [filter, setFilter] = React.useState("");
  const [filterData, setFilterData] = React.useState(CARD_DATA);
  const [productModal, setProductModal] = React.useState(false);
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    if (filter?.length >= 2) {
      const searchedData = CARD_DATA.filter((e) =>
        e.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilterData(searchedData);
    } else {
      // If filter length is less than 2, show all data
      setFilterData(CARD_DATA);
    }
  }, [filter]);



  
  // get ProductsData
  React.useEffect(() => {
    const getAllProducts = async () => {
      await getProducts(setProduct)
    };
    getAllProducts();
  }, []);



  return (
    <DashboardLayout
      title="Add Products"
      buttonClick={() => setProductModal(true)}
    >
      <FilterProducts search={filter} filterData={filterData} setSearch={setFilter} />
      <ProductCard productData={product ? product : []} />
      {productModal && (
        <DashProductModal
          title="Add Admin"
          productModal={productModal}
          onClose={() => setProductModal(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default ManageProducts;
