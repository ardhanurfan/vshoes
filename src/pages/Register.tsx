import { Link, useNavigate } from "react-router-dom";
import Textfield from "../components/Textfield";
import { useState } from "react";
import { post } from "../api/api";
import { toastError, toastSuccess } from "../components/Toast";
import Loading from "../components/Loading";

const Register = () => {
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigator = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toastError("Password not match");
      return;
    }
    setIsLoading(true);
    try {
      await post("register", {
        fullname: fullname,
        username: username,
        email: email,
        password: password,
        role: "user",
      });
      navigator("/login");
      toastSuccess("Register successfuly");
    } catch (error) {
      toastError((error as any).response.data.detail);
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
          onSubmit={(e) => handleRegister(e)}
          className="w-full max-w-md bg-white rounded-lg p-6 bg-opacity-80 backdrop-blur-sm"
        >
          <h2 className="text-gray-800 text-4xl mb-6 font-bold">
            Register to <br />
            explore your needs
          </h2>
          <div className="mb-4">
            <Textfield
              label={"Fullname"}
              onChange={(val) => setFullname(val.target.value)}
            />
          </div>
          <div className="mb-4">
            <Textfield
              label={"Username"}
              onChange={(val) => setUsername(val.target.value)}
            />
          </div>
          <div className="mb-4">
            <Textfield
              label={"Email"}
              onChange={(val) => setEmail(val.target.value)}
            />
          </div>
          <div className="mb-4">
            <Textfield
              label={"Password"}
              type="password"
              onChange={(val) => setPassword(val.target.value)}
            />
          </div>
          <div className="mb-6">
            <Textfield
              label={"Confirm Password"}
              type="password"
              onChange={(val) => setConfirmPassword(val.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button
              className="bg-sky-950 hover:bg-sky-700 active:bg-sky-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoading ? <Loading /> : "Sign Up"}
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-red-300 transition-all duration-300"
              to="/login"
            >
              Have an account? Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
