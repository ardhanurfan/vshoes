import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const ProductDetail = ({ product }: { product: Product }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className="bg-white p-6 w-full relative">
      {product && product.varians.length == 0 ? (
        <>
          <div className="w-full h-96 object-cover mb-4 rounded-md bg-slate-500 flex justify-center items-center text-white text-4xl">
            <FaCamera />
          </div>
          <div className="w-10 h-10 round"></div>
        </>
      ) : (
        <>
          <iframe
            id={product.name}
            className="w-full h-96 object-cover mb-4 rounded-md"
            title={product.name}
            src={product.varians[index].virtual_url}
          ></iframe>
          <div className="flex justify-center gap-2">
            {product.varians.map((varian: Varian, idx: number) => (
              <div
                onClick={() => setIndex(idx)}
                className={`cursor-pointer w-10 h-10 rounded-full ${
                  varian.color == "black"
                    ? "bg-black"
                    : varian.color == "red"
                    ? "bg-red-500"
                    : varian.color == "brown"
                    ? "bg-yellow-900"
                    : varian.color == "white"
                    ? "bg-white"
                    : varian.color == "pink"
                    ? "bg-pink-500"
                    : varian.color == "purple"
                    ? "bg-purple-500"
                    : varian.color == "green"
                    ? "bg-green-500"
                    : varian.color == "blue"
                    ? "bg-blue-500"
                    : varian.color == "yellow"
                    ? "bg-yellow-500"
                    : ""
                } ${
                  index == idx &&
                  "outline outline-gray-500 outline-2 outline-offset-2"
                }`}
              ></div>
            ))}
          </div>
        </>
      )}
      <div>
        <div className="flex justify-between items-center text-2xl font-bold">
          <h3 className="mb-2">{product.name}</h3>
          <p className="text-blue-800 mb-2">{product.brand.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
