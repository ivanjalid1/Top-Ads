
export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  avatarUrl?: string;
  role: 'User' | 'Admin';
  fullName?: string;
  phone?: string;
  address?: string;
  telegramUser?: string;
}

export interface Product {
  id: string;
  slug?: string;
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
  description?: string; // Long description
}

export interface ServiceItem {
  id: number;
  slug?: string;
  title: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  icon: any;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  total: number;
  itemsCount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  paymentMethod: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'refund';
  description: string;
  reference: string;
  date: string;
  amount: number;
  balanceAfter: number;
  status?: 'waiting' | 'confirming' | 'pending' | 'finished' | 'failed';
}
