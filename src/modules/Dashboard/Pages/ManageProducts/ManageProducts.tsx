import React from "react";
import ProductCard from "./components/ProductCard/ProductCard";
import DashboardLayout from "DashboardLayout/DashboardLayout";
import FilterProducts from "./components/FilterProducts/FilterProducts";
import DashProductModal from "./components/DashProductModal/DashProductModal";
import { CARD_DATA } from "constants/contents/data";

const ManageProducts = () => {
  const [filter, setFilter] = React.useState("");
  const [filterData, setFilterData] = React.useState(CARD_DATA);
  const [productModal, setProductModal] = React.useState(false);

  React.useEffect(() => {
    if (filter?.length >= 2) {
      const searchedData = filterData.filter((e: any) =>
        `${e.category.toLowerCase()} `.includes(filter.toLowerCase())
      );
      setFilterData(searchedData);
    } else {
      setFilterData(CARD_DATA);
    }
  }, [filter]);

  return (
    <DashboardLayout
      title="Add Products"
      buttonClick={() => setProductModal(true)}
    >
      <FilterProducts search={filter} setSearch={setFilter} />
      <ProductCard productData={filterData ? filterData : []} />
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
