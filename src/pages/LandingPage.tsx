import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import { useContext, useEffect, useState } from "react";
import { deleteWithAuth, getWithAuth, postWithAuthJson } from "../api/api";
import { toastError, toastSuccess } from "../components/Toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import ProductDetail from "../components/ProductDetail";
import Cookies from "js-cookie";
import LoadingPage from "../components/LoadingPage";
import BrandCard from "../components/BrandCard";
import LoadingButton from "../components/LoadingButton";
import Textfield from "../components/Textfield";
import Dropdown from "../components/Dropdown";
import { UserContext } from "../context/UserContext";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showHapusProduct, setShowHapusProduct] = useState<boolean>(false);
  const [showHapusBrand, setShowHapusBrand] = useState<boolean>(false);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [showAddBrand, setShowAddBrand] = useState<boolean>(false);
  const [showAddVarian, setShowAddVarian] = useState<boolean>(false);
  const [selected, setSelected] = useState<Product>();
  const [productId, setProductId] = useState<number>(-1);
  const [brandId, setBrandId] = useState<number>(-1);

  const [namaBrand, setNamaBrand] = useState<string>("");

  const [namaShoes, setNamaShoes] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<{
    label: string;
    value: string;
  }>();

  const [vectaryUrl, setVectaryUrl] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{
    label: string;
    value: string;
  }>();

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
    setIsLoadingButton(true);
    if (token) {
      try {
        await deleteWithAuth("shoes/" + productId, token);
        getProducts();
        toastSuccess("Delete Product successfuly");
        setShowHapusProduct(false);
      } catch (error) {
        toastError("Delete Product Failed");
      } finally {
        setIsLoadingButton(false);
      }
    }
  };

  const handleDeleteBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingButton(true);
    if (token) {
      try {
        await deleteWithAuth("brand/" + brandId, token);
        getBrands();
        toastSuccess("Delete Brand successfuly");
        setShowHapusBrand(false);
      } catch (error) {
        toastError("Delete Brand Failed");
      } finally {
        setIsLoadingButton(false);
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingButton(true);
    if (token) {
      try {
        await postWithAuthJson(
          "shoes",
          {
            brand_id: Number.parseInt(selectedBrand?.value!),
            name: namaShoes,
            category: category,
            stock: stock,
            price: price,
          },
          token
        );
        getProducts();
        toastSuccess("Add Product successfuly");
        setShowAddProduct(false);
      } catch (error) {
        toastError("Add Product Failed");
      } finally {
        setIsLoadingButton(false);
      }
    }
  };

  const handleAddBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingButton(true);
    if (token) {
      try {
        await postWithAuthJson(
          "brand",
          {
            name: namaBrand,
          },
          token
        );
        getBrands();
        toastSuccess("Add Brand successfuly");
        setShowAddBrand(false);
      } catch (error) {
        toastError("Add Brand Failed");
      } finally {
        setIsLoadingButton(false);
      }
    }
  };

  const handleAddVarian = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingButton(true);
    if (token) {
      try {
        await postWithAuthJson(
          "varian",
          {
            shoes_id: productId,
            virtual_url: vectaryUrl,
            color: selectedColor?.value!,
          },
          token
        );
        getProducts();
        toastSuccess("Add Varian successfuly");
        setShowAddVarian(false);
      } catch (error) {
        toastError("Add Varian Failed");
      } finally {
        setIsLoadingButton(false);
      }
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
          <h1 className="text-center font-bold xl:text-start text-xl text-sky-900">
            Delete Product
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full">
            <button
              className="bg-red-500 hover:bg-red-700 active:bg-red-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoadingButton ? <LoadingButton /> : "Delete"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal visible={showHapusBrand} onClose={() => setShowHapusBrand(false)}>
        <form
          onSubmit={(e) => handleDeleteBrand(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center font-bold xl:text-start text-xl text-sky-900">
            Delete Brand
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full">
            <button
              className="bg-red-500 hover:bg-red-700 active:bg-red-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoadingButton ? <LoadingButton /> : "Delete"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal visible={showAddBrand} onClose={() => setShowAddBrand(false)}>
        <form
          onSubmit={(e) => handleAddBrand(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center font-bold xl:text-start text-xl text-sky-900">
            Add Brand
          </h1>
          <div className="mb-4">
            <Textfield
              label={"Nama Brand"}
              onChange={(val) => setNamaBrand(val.target.value)}
            />
          </div>
          <div className="flex w-full">
            <button
              className="bg-sky-950 hover:bg-sky-700 active:bg-sky-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoadingButton ? <LoadingButton /> : "Save Brand"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal visible={showAddProduct} onClose={() => setShowAddProduct(false)}>
        <form
          onSubmit={(e) => handleAddProduct(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center font-bold xl:text-start text-xl text-sky-900">
            Add Product
          </h1>
          <Dropdown
            isLabel
            label={"Brand Name"}
            onChange={(val) => setSelectedBrand(val!)}
            options={brands.map((brand: Brand) => {
              return { value: brand.id.toString(), label: brand.name };
            })}
          />
          <Textfield
            label={"Shoes Name"}
            onChange={(val) => setNamaShoes(val.target.value)}
          />
          <Textfield
            label={"Category Name"}
            onChange={(val) => setCategory(val.target.value)}
          />
          <Textfield
            label={"Stock"}
            onChange={(val) => setStock(Number.parseInt(val.target.value))}
          />
          <Textfield
            label={"Price"}
            onChange={(val) => setPrice(Number.parseInt(val.target.value))}
          />
          <div className="flex w-full">
            <button
              className="bg-sky-950 hover:bg-sky-700 active:bg-sky-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoadingButton ? <LoadingButton /> : "Save Product"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal visible={showAddVarian} onClose={() => setShowAddVarian(false)}>
        <form
          onSubmit={(e) => handleAddVarian(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center font-bold xl:text-start text-xl text-sky-900">
            Add Varian
          </h1>
          <Dropdown
            isLabel
            label={"Color"}
            onChange={(val) => setSelectedColor(val!)}
            options={[
              "black",
              "red",
              "brown",
              "white",
              "pink",
              "purple",
              "green",
              "blue",
              "gray",
              "yellow",
            ].map((color: string) => {
              return { value: color, label: color };
            })}
          />
          <Textfield
            label={"Vectary Link Model"}
            onChange={(val) => setVectaryUrl(val.target.value)}
          />
          <div className="flex w-full">
            <button
              className="bg-sky-950 hover:bg-sky-700 active:bg-sky-900 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition-all duration-300 mb-4 md:mb-0"
              type="submit"
            >
              {isLoadingButton ? <LoadingButton /> : "Save Varian"}
            </button>
          </div>
        </form>
      </Modal>

      <div className="bg-gray-100 text-gray-800">
        <Header onSearch={(val) => setSearch(val)} />
        <Banner />
        {/* Featured Products Section */}
        <section className="container mx-auto my-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold ">Featured Products</h2>
            {user?.role == "admin" && (
              <button
                onClick={() => setShowAddProduct(true)}
                className="h-fit bg-amber-500 hover:bg-amber-700 active:bg-amber-900 text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-80 active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
              >
                + Add Product
              </button>
            )}
          </div>
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
                  onAdd={(id) => {
                    setShowAddVarian(true);
                    setProductId(id);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="container mx-auto my-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold ">Brands</h2>
            {user?.role == "admin" && (
              <button
                onClick={() => setShowAddBrand(true)}
                className="h-fit bg-amber-500 hover:bg-amber-700 active:bg-amber-900 text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-80 active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
              >
                + Add Brand
              </button>
            )}
          </div>
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
