import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import './Home.css'

function Cuisine() {
  let params = useParams();
  const [cuisine, setCuisine] = useState([]);

  const getCuisine = async (name) => {
    try {
      const response= await axios.get( `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&number=9&cuisine=${name}`)
      console.log(response,"response")
      setCuisine(response.data.results)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <div className="Home-main row">
      {cuisine.map((item) => {
        return (
            <div className='col-3'>
       <div key={item.id} className="card">
        <img src={item.image} alt="" className='card-img'/>

        <p>{item.title}</p>
        </div>
        
       </div>
       
        );
      })}
    </div>
  );
}



export default Cuisine;
