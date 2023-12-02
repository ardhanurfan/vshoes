import { FaCamera } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { formatRp } from "./FormatRp";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const ProductCard = ({
  product,
  onSelect,
  onDelete,
  onAdd,
}: {
  product: Product;
  onSelect: (x: Product) => void;
  onDelete: (x: number) => void;
  onAdd: (x: number) => void;
}) => {
  const { user } = useContext(UserContext);

  return (
    <div className="relative">
      {user?.role == "admin" && (
        <div className="absolute right-4 top-4">
          <div
            onClick={() => onDelete(product.id)}
            className="mb-2 text-white text-3xl cursor-pointer rounded-full h-8 w-8 bg-red-500 hover:bg-red-700 active:bg-red-900 flex justify-center items-center"
          >
            <MdDeleteForever />
          </div>
          <div
            onClick={() => onAdd(product.id)}
            className="text-white text-3xl cursor-pointer rounded-full h-8 w-8 bg-blue-500 hover:bg-blue-700 active:bg-blue-900 flex justify-center items-center"
          >
            <IoMdAddCircleOutline />
          </div>
        </div>
      )}
      <div
        onClick={() => onSelect(product)}
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl ease-in-out duration-300 cursor-pointer"
      >
        {product && product.varians.length == 0 ? (
          <>
            <div className="w-full h-60 object-cover mb-4 rounded-md bg-slate-500 flex justify-center items-center text-white text-4xl">
              <FaCamera />
            </div>
            <div className="w-5 h-5 round"></div>
          </>
        ) : (
          <>
            <iframe
              id={product.name}
              className="w-full h-60 object-cover mb-4 rounded-md"
              title={product.name}
              src={product.varians[0].virtual_url}
            ></iframe>
            <div className="flex justify-center gap-2">
              {product.varians.map((varian: Varian) => (
                <div
                  className={`w-5 h-5 rounded-full ${
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
                      : varian.color == "gray"
                      ? "bg-gray-500"
                      : varian.color == "yellow"
                      ? "bg-yellow-500"
                      : ""
                  }`}
                ></div>
              ))}
            </div>
          </>
        )}
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-blue-800 mb-2">{product.brand.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-red-600 font-bold mb-2">
              {formatRp(product.price)}
            </p>
            <p className="text-gray-600 mb-2">{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
