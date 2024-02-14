import LoginForm from "../../components/user/Login/LoginForm";
import NavBar from "../../components/user/Login/NavBar";

const Login: React.FC = () => {
  return (
    <>
      <NavBar />
      <LoginForm textToshow={"Are you a employer"} submitLink={"http:submit"} />
    </>
  );
};

export default Login;
