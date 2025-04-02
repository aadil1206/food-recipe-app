import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import "./Category.css";
import { NavLink } from "react-router-dom";

import React from "react";

function Catagory() {
  return (
    <div className="list d-flex col-12">
      <NavLink to={"/cuisine/italian"} className="navLink col-3">
        <FaPizzaSlice />
        <h4 style={{ display: "flex" }}>Italian</h4>
      </NavLink>
      <NavLink to={"/cuisine/american"} className="navLink col-3">
        <FaHamburger />
        <h4 style={{ display: "flex" }}>American</h4>
      </NavLink>
      <NavLink to={"/cuisine/thai"} className="navLink col-3 ">
        <GiNoodles />
        <h4 style={{ display: "flex" }}>Thai</h4>
      </NavLink>
      <NavLink to={"/cuisine/Middle Eastern"} className="navLink col-3">
        <GiChopsticks />
        <h4>Arab</h4>
      </NavLink>
    </div>
  );
}

export default Catagory;
