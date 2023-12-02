interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: string;
  brand_id: number;
  varians: Varian[];
  brand: Brand;
}
