import React, { useEffect, useState } from "react";
import Textfield from "../components/Textfield";
import LoadingButton from "../components/LoadingButton";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toastError } from "../components/Toast";
import { getWithAuth, postWithAuth } from "../api/api";
import Cookies from "js-cookie";
import Dropdown from "../components/Dropdown";
import { formatRp } from "../components/FormatRp";

const CleaningPage: React.FC = () => {
  const [consultationResult, setConsultationResult] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shoetype, setshoetype] = useState<{
    label: string;
    value: string;
  }>();
  const [shoesize, setshoesize] = useState<string>("");
  const [shoecolor, setshoecolor] = useState<string>("");
  const [shoebrand, setshoebrand] = useState<string>("");
  const [condition, setcondition] = useState<string>("");

  const [cleaner, setCleaner] = useState<Cleaner[]>([]);

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
          shoetype: shoetype?.value.toLowerCase(),
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

  const getCleaner = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "cleaner");
        const data = response.data?.data as [][];
        setCleaner(
          data.map((value: any[]) => {
            return {
              title: value[1],
              price: value[3],
              category: value[5],
              desc: value[2],
            };
          })
        );
      } catch (error) {
        toastError("Get Brands Failed");
      }
    }
  };
  useEffect(() => {
    getCleaner();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Link
        to={"/"}
        className="absolute z-50 bg-white top-4 left-4 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-full font-bold active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
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
            <Dropdown
              isLabel
              label={"Shoes Type"}
              onChange={(val) => setshoetype(val!)}
              options={["Sneakers", "Loafers", "Flip-Flops"].map(
                (color: string) => {
                  return { value: color, label: color };
                }
              )}
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
            {isLoading ? <LoadingButton /> : "Send"}
          </button>
        </form>
      </div>
      <div className="md:w-1/2 p-8 flex justify-center items-center flex-col">
        <div className="mb-10">
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
        <div className="flex gap-2 flex-wrap justify-center px-20">
          {cleaner.map((cleaner: Cleaner) => (
            <div className="w-40 p-2 bg-white shadow-lg text-[12px] rounded-md group relative">
              <p className="text-sky-950 font-bold text-[16px] group-hover:blur-md duration-300 ease-in-out">
                {cleaner.title}
              </p>
              <p className="text-orange-500 group-hover:blur-md duration-300 ease-in-out">
                {formatRp(cleaner.price)}
              </p>
              <p className="group-hover:blur-md duration-300 ease-in-out">
                {cleaner.category}
              </p>
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-950 w-full text-center p-2 font-medium opacity-0 group-hover:opacity-100 duration-300 ease-in-out">
                {cleaner.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CleaningPage;
