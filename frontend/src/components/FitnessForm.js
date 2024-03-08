import { useState, useEffect } from "react";

const FitnessForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State variable to trigger page refresh
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (refreshKey !== 0) {
      // Reload the page when refreshKey changes
      window.location.reload();
    }
  }, [refreshKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const fitness = { title, date, caloriesBurned, duration };

    const response = await fetch("/api/fitness/:email", {
      method: "POST",
      body: JSON.stringify(fitness),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setDuration("");
      setCaloriesBurned("");
      setDate("");
      setError(null);
      setRefreshKey(prevKey => prevKey + 1); // Increment refreshKey to trigger page refresh
    }
  };
  
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New fitness</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Date:</label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />

      <label>Calories Burned:</label>
      <input
        type="number"
        onChange={(e) => setCaloriesBurned(e.target.value)}
        value={caloriesBurned}
      />

      <label>Duration:</label>
      <input
        type="number"
        onChange={(e) => setDuration(e.target.value)}
        value={duration}
      />

      <button>Add Fitness</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default FitnessForm;


