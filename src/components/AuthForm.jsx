import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import TextField from "@mui/material/TextField";
import styles from "../styles/AuthForm.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin = false, isSignup = false }) => {
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
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h1>{isLogin ? "Hei!" : "Create an Account"}</h1>

      {!isLogin && (
        <TextField
          className={styles.authFormSection}
          id="outlined-username-input"
          label="Username"
          type="text"
          required
          value={username}
          onChange={(event) => handleUsername(event)}
        />
      )}
      <TextField
        className={styles.authFormSection}
        id="outlined-email-input"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => handleEmail(event)}
      />

      <TextField
        className={styles.authFormSection}
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button
        variant="contained"
        className={styles.authFormButton}
        type="submit"
      >
        {isLogin ? "Login" : "Signup"}
      </Button>

      {isLogin ? (
        <p>
          <Link to="/signup">Create an account</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
