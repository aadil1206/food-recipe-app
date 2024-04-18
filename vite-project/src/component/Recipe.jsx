import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaClock,
  FaDollarSign,
  FaHeart,
  FaCreativeCommonsBy,
} from "react-icons/fa";
import axios from "axios";
import "./Recipe.css";

const Recipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipeFood, setrecipeFood] = useState([]);
  const [ingredients, setingredients] = useState([]);
  const getIngredients = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${
          location.state.id
        }/ingredientWidget.json?apiKey=${import.meta.env.VITE_API_KEY}`
      );
      console.log(response.data.ingredients, "response");
      setingredients(response.data.ingredients);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getrecipeFood = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${
          location.state.id
        }/information?apiKey=${import.meta.env.VITE_API_KEY}`
      );
      console.log(response, "response");
      setrecipeFood(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getrecipeFood1 = async () => {
    try {
      const response12 = await axios.get(
        `https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api`
      );
      console.log(response12, "response12345");
      // setrecipeFood(response.data)
    } catch (error) {
      console.log("error", error);
    }
  };
  const instructions = (recipeFood?.instructions || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .substring(0, 600);
  useEffect(() => {
    getrecipeFood();
    getrecipeFood1();
    getIngredients();
  }, []);
  return (
    <div className="RecipeCardMain">
      <h1>{recipeFood?.title}</h1>
      <div className="row Recipe-Card">
        <div className="col-4">
          <div className="recCard col-12">
            <img
              src={recipeFood?.image}
              alt=""
              className="recCard-img col-12"
            />
            <div className="recCard-img-bottom p-3">
              <div className="d-flex justify-content-center">
                <FaClock size="2rem"></FaClock>
                <h3>{recipeFood?.readyInMinutes + " min"}</h3>
              </div>
              <div className="d-flex justify-content-center">
                <FaDollarSign size="2rem"></FaDollarSign>
                <h3>8.75</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="recCard col-12 p-4">
            <h2>Ingredients</h2>
            <div
              style={{
                overflowY: "scroll",
                scrollSnapType: "y",
                height: "300px",
              }}
            >
              {ingredients?.map((item, id) => {
                return (
                  <div key={id}>
                    <ol>
                      <li>{item?.name}</li>
                    </ol>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-4 ">
          <div className="recCard col-12 p-4">
            <h2>Instructions</h2>
            <h3
              style={{
                overflowY: "scroll",
                scrollSnapType: "y",
                height: "300px",
              }}
            >
              {instructions}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
