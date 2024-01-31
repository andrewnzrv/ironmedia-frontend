import AuthForm from "../components/AuthForm";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { Button } from "@mui/base";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Container maxWidth="xl" className="container">
      <AuthForm isLogin />
    </Container>
  );
};

export default LoginPage;
