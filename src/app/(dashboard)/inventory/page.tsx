import { Product } from "@/types";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

// MOCK DATA: Esto luego vendrá de tu base de datos real (productService)
// Como es un Server Component, podemos hacer la query a DB directo aquí.
async function getProducts(): Promise<Product[]> {
  // Simulación de delay
  // await new Promise(resolve => setTimeout(resolve, 1000)); 
  
  return [
    { id: "1", name: "Camiseta Básica", costPrice: 15000, stock: 120, category: "Ropa" },
    { id: "2", name: "Jean Slim Fit", costPrice: 45000, stock: 4, category: "Ropa"},
    { id: "3", name: "Zapatillas Urban", costPrice: 89000, stock: 25, category: "Calzado" },
    { id: "4", name: "Gorra Trucker", costPrice: 12000, stock: 0, category: "Accesorios"},
    // ... más datos
  ]
}

export default async function InventoryPage() {
  const data = await getProducts();

  return (
    <div className="flex flex-col gap-1">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Inventario</h1>
            <p className="text-stone-500 dark:text-stone-400">Gestiona tus productos, costPrices y stock.</p>
        </div>
      </div>

      {/* LA TABLA POTENTE */}
      <div className="container mx-auto py-2">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}