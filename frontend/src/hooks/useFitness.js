import { useState } from "react";
export const useFitness = ({title, date, duration, caloriesBurned, }) => {
  const [fitness, setFitness] = useState([]);
  const apiUrl = "/api/fitness";
  const token = localStorage.getItem("token");
  const handleFitness = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const newFitness = {title, date, duration, caloriesBurned};
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newFitness),
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      });
      // json = newFitness
      const json = await response.json();
      console.log(response, newFitness);
      if (response.ok) {
        setFitness((prevFitness) => [json, ...prevFitness]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleFitness, fitness };
};