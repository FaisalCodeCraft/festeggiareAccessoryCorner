import React from "react";
import Header from "./components/Header/Header";
import NewArrival from "./components/NewArrival/NewArrival";
import AllProducts from "./components/AllProducts/AllProducts";
import { NEW_ARRIVALS, TOP_RATED } from "constants/contents/data";

const Home = () => {
  return (
    <>
      <Header />
      <NewArrival title={"New Arrivals"} productArray={NEW_ARRIVALS} />
      <NewArrival title={"Top Rated"} productArray={TOP_RATED} />
      <AllProducts />
    </>
  );
};

export default Home;
