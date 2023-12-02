import { Link, useNavigate } from "react-router-dom";
import Textfield from "../components/Textfield";
import { useState } from "react";
import { post } from "../api/api";
import Cookies from "js-cookie";
import { toastError, toastSuccess } from "../components/Toast";
import Loading from "../components/Loading";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigator = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await post("login", {
        username: username,
        password: password,
      });
      const access_token = response?.data.access_token;
      Cookies.set("token_vshoes", access_token, { expires: 7 });
      navigator("/");
      toastSuccess("Login successfuly");
    } catch (error) {
      toastError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-white p-8 flex justify-center items-center">
        <img
          src="/sepatu_login.jpg"
          alt="Illustration"
          className="md:max-w-md xl:max-w-lg rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-[url('/background_login.jpg')] bg-cover bg-center">
        <form
          onSubmit={(e) => handleLogin(e)}
          className="w-full max-w-md bg-white rounded-lg p-6 bg-opacity-80 backdrop-blur-sm"
        >
          <h2 className="text-gray-800 text-4xl mb-6 font-bold">
            Login to continue <br />
            your journey
          </h2>
          <div className="mb-4">
            <Textfield
              label={"Username"}
              onChange={(val) => setUsername(val.target.value)}
            />
          </div>
          <div className="mb-6">
            <Textfield
              label={"Password"}
              type="password"
              onChange={(val) => setPassword(val.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button
              className="bg-sky-950 hover:bg-sky-700 active:bg-sky-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoading ? <Loading /> : "Sign In"}
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-red-300 transition-all duration-300"
              to="/register"
            >
              Don't have an account? Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
