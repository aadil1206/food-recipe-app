import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Cuisine() {
  let params = useParams();
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

  const [cuisine, setCuisine] = useState<Recipe[]>([]);

  const getCuisine = async (name:string) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=9&cuisine=${name}`
      );
      console.log(response, "response");
      setCuisine(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
useEffect(() => {
  if (params.type) {
    getCuisine(params.type);
  }
}, [params.type]);


  return (
    <div className="Home-main row">
      {cuisine.map((item) => {
        return (
          <div className="col-3">
            <div
              key={item.id}
              className="card"
              style={{ backgroundColor: "#F36A40" }}
            >
              <img src={item.image} alt="" className="card-img" />

              <p>{item.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cuisine;
