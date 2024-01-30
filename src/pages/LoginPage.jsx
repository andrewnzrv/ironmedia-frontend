import AuthForm from "../components/AuthForm";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  return (
    <Container maxWidth="xl" className="container">
      <Navbar />
      <AuthForm isLogin />
    </Container>
  );
};

export default LoginPage;
