import { Product } from "@/types/index"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "PROD-001",
    name: "Nike Air Max 90",
    category: "Calzado",
    costPrice: 80.00,
    salePrice: 120.50,
    stock: 25,
    features: { "Talle": "42", "Color": "Blanco" }
  },
  {
    id: "PROD-002",
    name: "MacBook Pro M3",
    category: "Electrónica",
    costPrice: 2100.00,
    salePrice: 2500.00,
    stock: 5,
    features: { "Procesador": "M3", "RAM": "16GB" }
  },
  // ... más productos
]