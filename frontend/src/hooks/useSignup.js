export const useSignup = ({
    username,
    email,
    password,
    dateOfBirth,
    phoneNumber,
  }) => {
    const apiUrl = "/api/user/signup";
    const handleSignup = async (e) => {
      e.preventDefault();
      console.log(e);
      try {
        const newUser = {
          username,
          email,
          password,
          dateOfBirth,
          phoneNumber,
        };
        const response = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(response, newUser);
        if (response.ok) {
          alert("!!!!HIENOSTI REKISTERÖIDYTTY!!!!");
        }
      } catch (error) {
        console.error(error);
      }
    };
    return { handleSignup };
  };