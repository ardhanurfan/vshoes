import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getWithAuth } from "../api/api";
import { toastError } from "../components/Toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import ProductDetail from "../components/ProductDetail";
import Cookies from "js-cookie";

const LandingPage = () => {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selected, setSelected] = useState<Product>();

  const token = Cookies.get("token_vshoes");
  const getProducts = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "shoes");
        const data = response.data?.data as Product[];
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        toastError("Get Products Failed");
      }
    }
  };
  const getBrands = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "brand");
        const data = response.data?.data as Product[];
        setBrands(data);
      } catch (error) {
        toastError("Get Products Failed");
      }
    }
  };
  useEffect(() => {
    getProducts();
    getBrands();
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter(
        (val: Product) =>
          val.name.toLowerCase().includes(search.toLowerCase()) ||
          val.category.toLowerCase().includes(search.toLowerCase()) ||
          val.brand.name.toLowerCase().includes(search.toLowerCase()) ||
          val.price.toString().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <>
      <Modal visible={showDetail} onClose={() => setShowDetail(false)}>
        <ProductDetail product={selected!} />
      </Modal>

      <div className="bg-gray-100 text-gray-800">
        <Header onSearch={(val) => setSearch(val)} />
        <Banner />
        {/* Featured Products Section */}
        <section className="container mx-auto my-12">
          <h2 className="text-4xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {filtered.map((shoes: Product, index) => (
              <div key={index} className="flex-shrink-0">
                <ProductCard
                  onSelect={(product) => {
                    setSelected(product);
                    setShowDetail(true);
                  }}
                  product={shoes}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="container mx-auto my-12">
          <h2 className="text-4xl font-bold mb-8">Brands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((category, index) => (
              <div
                key={index}
                className="bg-white h-20 rounded-lg overflow-hidden shadow-md hover:shadow-xl ease-in-out duration-300 group cursor-pointer flex justify-center items-center"
              >
                <p className="text-gray-700 mt-2 text-2xl font-bold group-hover:text-3xl ease-in-out duration-300">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
