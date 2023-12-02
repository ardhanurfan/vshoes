import { MdDeleteForever } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function BrandCard({
  brand,
  onDelete,
}: {
  brand: Brand;
  onDelete: (x: number) => void;
}) {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-white h-20 rounded-lg overflow-hidden shadow-md hover:shadow-xl ease-in-out duration-300 group cursor-pointer flex justify-center items-center relative">
      {user?.role == "admin" && (
        <div
          onClick={() => onDelete(brand.id)}
          className="text-white text-3xl absolute right-4 top-4 cursor-pointer rounded-full h-8 w-8 bg-red-500 hover:bg-red-700 active:bg-red-900 flex justify-center items-center"
        >
          <MdDeleteForever />
        </div>
      )}
      <p className="text-gray-700 mt-2 text-2xl font-bold group-hover:text-3xl ease-in-out duration-300">
        {brand.name}
      </p>
    </div>
  );
}

export default BrandCard;
