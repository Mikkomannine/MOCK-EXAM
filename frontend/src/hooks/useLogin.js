import { useNavigate } from "react-router-dom";

export const useLogin = ({ email, password }) => {
  const navigate = useNavigate();
  const apiUrl = "/api/user/login";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        navigate("/");
      } else {
        const error = await response.json();
        console.log(error);
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleLogin };
};