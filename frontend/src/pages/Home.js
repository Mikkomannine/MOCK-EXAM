// components
import FitnessDetails from "../components/FitnessDetails";
import FitnessForm from "../components/FitnessForm";
import { useEffect, useState } from "react";
const Home = () => {
  const [fitnessData, setFitnessData] = useState([]);
  const apiUrl = "/api/fitness/";
  const user = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + user, {
          headers: {
            'Authorization': 'Bearer ' + token
          },
        });
        const data = await response.json();
        setFitnessData(data);
        console.log(fitnessData);
      } catch (error) {
        console.error("error: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(apiUrl + ":email/" + itemId, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    const updatedItems = fitnessData.filter((item) => {
      return item._id !== itemId;
    });
    setFitnessData(updatedItems);
  };

  return (
    <div className="home">
      <div className="fitness">
        {Array.isArray(fitnessData) && fitnessData.map((fitness) => (
          <FitnessDetails
            key={fitness._id}
            {...fitness}
            handleDelete={handleDeleteItem}
          />
        ))}
      </div>
      <FitnessForm setFitnessData={setFitnessData} />
    </div>
  );
};

export default Home;
/*
const Home = () => {
  const [fitnessData, setFitnessData] = useState([]);
  const apiUrl = "/api/fitness/";
  const user = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + user, {
        headers: {
          'Authorization': 'Bearer ' + token
        },
    });
        const data = await response.json();
        setFitnessData(data);
        console.log(fitnessData);
      } catch (error) {
        console.error("error: ", error);
      }
    };


    fetchData();
  }, []);
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(apiUrl + itemId, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    const updatedItems = fitnessData.filter((item) => {
      return item._id !== itemId;
    });
    setFitnessData(updatedItems);
  };
  return (
    <div className="home">
      <div className="fitness">
        {fitnessData.map((fitness) => (
          <FitnessDetails
            key={fitness._id}
            {...fitness}
            handleDelete={handleDeleteItem}
          />
        ))}
      </div>
      <FitnessForm setFitnessData={setFitnessData} />
    </div>
  );
};

export default Home;
*/
