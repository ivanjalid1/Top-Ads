export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  avatarUrl?: string;
  role: 'User' | 'Admin';
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  isHot?: boolean;
  features?: string[];
  stock?: number;
  deliveryType?: 'instant' | 'manual';
}