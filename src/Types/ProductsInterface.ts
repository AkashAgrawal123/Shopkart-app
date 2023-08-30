export interface Rating {
  rate: number;
  count: number;
}

export interface ProductFilters {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ModalFilters {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Product {
  quantity: number;
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  initialPrice: number;
  rating: Rating;
  type: string;
  altText: string;
  blurhashCode: string;
  isLiked: boolean;
  subCategory: string;
  color: string;
}

export interface productTypeData {
  id: number;
  image: string;
  name: string;
  noOfItem: number;
  altText: string;
  category: string;
  isActive: boolean;
}
