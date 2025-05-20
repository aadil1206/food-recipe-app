import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchedData = () => {
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

  const [SearchedFood, setSearchedFood] = useState<Recipe[]>([]);
  const getSearchedFood = async (name:string) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=6&query=${name}`
      );

      setSearchedFood(response.data.recipes);
    } catch (error) {
      console.log("error", error);
    }
  };
  type ReduceType = {
    word: string;
    maxLength: number;
  };
  
  const reduceWordLength = ({ word, maxLength }: ReduceType): string => {
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
     if (params.item) {

 getSearchedFood(params.item);
     }
   
  }, [params.item]);



  return (
    <div>
      {SearchedFood &&
        SearchedFood.length > 0 &&
        SearchedFood.map((item) => {
          return (
            <div className="col-3">
              <div key={item?.id} className="card">
                <img src={item?.image} alt="" className="card-img" />
                <div
                  style={{ backgroundColor: "#F36A40" }}
                  className="col-12 cardtext"
                >
                  <p>{item?.title}</p>
                </div>
                <p className="cardSum">
                {reduceWordLength({ word: item?.summary ?? "", maxLength: 150 })}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchedData;
