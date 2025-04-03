import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchedData = () => {
  let params = useParams();
  const [SearchedFood, setSearchedFood] = useState([]);
  const getSearchedFood = async (name) => {
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
  type reductype ={
    word:string,
    maxLength : number
  }
  const reduceWordLength = ({word, maxLength} : reductype) => {
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
    getSearchedFood(params.item);
  }, [params.item]);

  type mapprops = {
    id:number,
    title:string,
    summary:string
  }

  return (
    <div>
      {SearchedFood &&
        SearchedFood.length > 0 &&
        SearchedFood.map((item:mapprops) => {
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
                  {reduceWordLength(item?.summary, 150)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchedData;
