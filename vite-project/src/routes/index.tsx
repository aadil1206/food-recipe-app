import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../component/Home";
import SearchedData from "../component/SearchedData";
import Recipe from "../component/Recipe";
import Cuisine from "../component/Cuisine";

const index = () => {
  return (
    <div className="w-[100%] h-[100%] ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:item" element={<SearchedData />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </div>
  );
};

export default index;
