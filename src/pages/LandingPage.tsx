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
import LoadingPage from "../components/LoadingPage";
import Loading from "react-loading";
import BrandCard from "../components/BrandCard";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showHapusProduct, setShowHapusProduct] = useState<boolean>(false);
  const [showHapusBrand, setShowHapusBrand] = useState<boolean>(false);
  const [selected, setSelected] = useState<Product>();
  const [productId, setProductId] = useState<number>(-1);
  const [brandId, setBrandId] = useState<number>(-1);

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
      } finally {
        setIsLoading(false);
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
        toastError("Get Brands Failed");
      }
    }
  };
  useEffect(() => {
    getProducts();
    getBrands();
  }, []);

  const handleDeleteProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      // try {
      //   const response = await getWithAuth(token, "shoes");
      //   const data = response.data?.data as Product[];
      //   setProducts(data);
      //   setFiltered(data);
      // } catch (error) {
      //   toastError("Get Products Failed");
      // } finally {
      //   setIsLoading(false);
      // }
    }
  };

  const handleDeleteBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      // try {
      //   const response = await getWithAuth(token, "shoes");
      //   const data = response.data?.data as Product[];
      //   setProducts(data);
      //   setFiltered(data);
      // } catch (error) {
      //   toastError("Get Products Failed");
      // } finally {
      //   setIsLoading(false);
      // }
    }
  };

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
      <LoadingPage isLoad={isLoading} />

      <Modal visible={showDetail} onClose={() => setShowDetail(false)}>
        <ProductDetail product={selected!} />
      </Modal>

      <Modal
        visible={showHapusProduct}
        onClose={() => setShowHapusProduct(false)}
      >
        <form
          onSubmit={(e) => handleDeleteProduct(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center font-bold xl:text-start">
            Delete Product
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 active:bg-red-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoading ? <Loading /> : "Delete"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal visible={showHapusBrand} onClose={() => setShowHapusBrand(false)}>
        <form
          onSubmit={(e) => handleDeleteBrand(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center font-bold xl:text-start">Delete Brand</h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 active:bg-red-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoading ? <Loading /> : "Delete"}
            </button>
          </div>
        </form>
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
                  onDelete={(id) => {
                    setShowHapusProduct(true);
                    setProductId(id);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="container mx-auto my-12">
          <h2 className="text-4xl font-bold mb-8">Brands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((brand, index) => (
              <BrandCard
                key={index}
                brand={brand}
                onDelete={(id) => {
                  setShowHapusBrand(true);
                  setBrandId(id);
                }}
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
