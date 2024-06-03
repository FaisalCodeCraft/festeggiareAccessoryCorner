import React from "react";
import ProductTable from "./components/ProductTable/ProductTable";
import DashboardLayout from "DashboardLayout/DashboardLayout";
import FilterProducts from "./components/FilterProductsRecords/FilterProducts";
import { PRODUCT_DETAILS } from "constants/contents/data";

const ProductsRecord = () => {
  const [search, setSearch] = React.useState("");

  const [productTable, setProductTable] = React.useState(PRODUCT_DETAILS || []);

  React.useEffect(() => {
    if (search?.length >= 2) {
      const searchedData = productTable.filter((e:any) =>
        `${e?.title.toLowerCase()} `.includes(search.toLowerCase())
      );
      setProductTable(searchedData || []);
    } else {
      setProductTable(PRODUCT_DETAILS)
    }
  }, [search,productTable]);




  return (
    <DashboardLayout title="Product List">
      <FilterProducts
        search={search}
        setSearch={setSearch}
      />
      <ProductTable tableData={productTable ? productTable : []} />
    </DashboardLayout>
  );
};

export default ProductsRecord;
