import AuthForm from "../components/AuthForm";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

const SignUpPage = () => {
  return (
    <Container maxWidth="xl" className="container">
      <AuthForm />
    </Container>
  );
};

export default SignUpPage;
