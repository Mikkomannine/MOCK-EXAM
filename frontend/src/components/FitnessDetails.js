import { useState } from "react";
import { formatDistanceToNow } from "date-fns";


const FitnessDetails = ({ _id, title, date, duration, caloriesBurned, handleDelete }) => {

  const deleteFitness = () => {
    handleDelete(_id);
  }

  return (
    <div className="fitness-details">
      <h4>{title}</h4>
      <p>Date: {date}<br />
      </p>
      <p>Duration: {duration} minutes</p>
      <p>Calories Burned: {caloriesBurned}</p>
      <span className="material-symbols-outlined" onClick={deleteFitness}>delete</span>
    </div>
  );
};

export default FitnessDetails;
