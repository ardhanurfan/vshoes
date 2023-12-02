import React, { useState } from "react";
import Textfield from "../components/Textfield";
import Loading from "../components/Loading";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toastError } from "../components/Toast";
import { postWithAuth } from "../api/api";
import Cookies from "js-cookie";

const CleaningPage: React.FC = () => {
  const [consultationResult, setConsultationResult] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shoetype, setshoetype] = useState<string>("");
  const [shoesize, setshoesize] = useState<string>("");
  const [shoecolor, setshoecolor] = useState<string>("");
  const [shoebrand, setshoebrand] = useState<string>("");
  const [condition, setcondition] = useState<string>("");

  const token = Cookies.get("token_vshoes");
  const handleConsultationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await postWithAuth(
        "cleaner",
        {
          shoetype: shoetype,
          shoesize: shoesize,
          shoecolor: shoecolor,
          shoebrand: shoebrand,
          initialcondition: condition,
        },
        token ?? ""
      );
      var result = response.data.data;
      setConsultationResult(result);
    } catch (error) {
      toastError((error as any).response.data.detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Link
        to={"/"}
        className="absolute bg-white top-4 left-4 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-full font-bold active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
      >
        <div className="text-2xl">
          <IoArrowBackCircleOutline />
        </div>
        <p className="hidden md:block">Back</p>
      </Link>
      <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-[url('/cleaning.jpg')] bg-cover bg-center">
        <form
          onSubmit={handleConsultationSubmit}
          className="w-full max-w-md bg-white rounded-lg p-6 bg-opacity-80 backdrop-blur-sm"
        >
          <h2 className="text-gray-800 text-4xl mb-6 font-bold">
            Cleaner Consultant <br />
            by Shoes Wizard Co.
          </h2>
          <div className="mb-4">
            <Textfield
              label={"Shoes Type"}
              onChange={(val) => setshoetype(val.target.value)}
            />
          </div>
          <div className="mb-4">
            <Textfield
              label={"Shoes Size"}
              onChange={(val) => setshoesize(val.target.value)}
            />
          </div>
          <div className="mb-4">
            <Textfield
              label={"Shoes Color"}
              onChange={(val) => setshoecolor(val.target.value)}
            />
          </div>
          <div className="mb-4">
            <Textfield
              label={"Shoes Brand"}
              onChange={(val) => setshoebrand(val.target.value)}
            />
          </div>
          <div className="mb-6">
            <Textfield
              label={"Condition"}
              onChange={(val) => setcondition(val.target.value)}
            />
          </div>
          <button
            className="bg-sky-950 hover:bg-sky-700 active:bg-sky-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
            type="submit"
          >
            {isLoading ? <Loading /> : "Send"}
          </button>
        </form>
      </div>
      <div className="md:w-1/2 p-8 flex justify-center items-center">
        <div>
          {consultationResult ? (
            <>
              <h2 className="text-sky-950 text-4xl mb-6 font-bold">
                Saran Kami Untuk Sepatu Anda
              </h2>

              <div className="bg-white text-gray-700 p-4 mb-4 rounded-md shadow-xl">
                <p className="text-xl font-bold mb-2">Hasil Konsultasi</p>
                <p>{consultationResult}</p>
              </div>
            </>
          ) : (
            <img
              src={"/banner.jpg"}
              alt="Consultation Illustration"
              className="md:max-w-md xl:max-w-lg rounded-lg shadow-lg transition-shadow"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CleaningPage;
