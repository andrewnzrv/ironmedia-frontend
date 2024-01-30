import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AuthForm = ({ isLogin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const { saveToken } = useContext(AuthContext);

  const handleEmail = (event) => setEmail(event.target.value);
  const handleUsername = (event) => setUsername(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = { email, password };

    if (!isLogin) {
      reqBody.username = username;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();
        console.log(parsed);
      }
      if (response.status === 201) {
        navigate("/login");
      }
      if (response.status === 200) {
        const parsed = await response.json();
        console.log(parsed);
        saveToken(parsed.authToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" required value={email} onChange={handleEmail} />
      </label>
      {!isLogin && (
        <label>
          Username
          <input
            type="text"
            required
            value={username}
            onChange={handleUsername}
          />
        </label>
      )}
      <label>
        Password
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">{isLogin ? "Login" : "Signup"}</button>
    </form>
  );
};

export default AuthForm;
