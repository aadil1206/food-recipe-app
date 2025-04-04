import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  type Ingredient = {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
  };
  
  type InstructionStep = {
    number: number;
    step: string;
    ingredients: { id: number; name: string; localizedName: string; image: string }[];
    equipment: { id: number; name: string; localizedName: string; image: string }[];
    length?: { number: number; unit: string };
  };
  
  type Recipe = {
    id: number;
    image: string;
    imageType: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    pricePerServing: number;
    extendedIngredients: Ingredient[];
    summary: string;
    dishTypes: string[];
    diets: string[];
    instructions: string;
    analyzedInstructions: { name: string; steps: InstructionStep[] }[];
  };
  const [Food, setFood] = useState<Recipe[]>();
  const navigate = useNavigate();
  const getRecData = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=30`
      );
      console.log(response, "response");
      setFood(response.data.recipes);
    } catch (error) {
      console.log("error", error);
    }
  };
  const reduceWordLength = (word:string, maxLength:number) => {
    if (word.length > maxLength) {
      return word
        .substring(0, maxLength)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
    }
    return word;
  };
  useEffect(() => {
    getRecData();
  }, []);
  return (
    <div className="Home-main row">
      {Food &&
        Food.length > 0 &&
        Food.map((item) => {
          return (
            <div className="col-3">
              <div key={item.id} className="card">
                <img src={item.image} alt="" className="card-img" />
                <div
                  style={{ backgroundColor: "#F36A40" }}
                  className="col-12 cardText"
                >
                  <p>{item.title}</p>
                </div>
                <p className="cardSum">
                  {reduceWordLength(item.summary, 150)}
                  <button onClick={() => navigate("/recipe", { state: item })}>
                    Recipes
                  </button>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
