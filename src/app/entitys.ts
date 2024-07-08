export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  products: Product[];
  total: number;
}
