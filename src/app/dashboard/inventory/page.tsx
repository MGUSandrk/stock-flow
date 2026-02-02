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
    { id: "1", nombre: "Camiseta Básica", precio: 15000, stock: 120, categoria: "Ropa", color: "Blanco" },
    { id: "2", nombre: "Jean Slim Fit", precio: 45000, stock: 4, categoria: "Ropa", color: "Azul" },
    { id: "3", nombre: "Zapatillas Urban", precio: 89000, stock: 25, categoria: "Calzado", color: "Negro" },
    { id: "4", nombre: "Gorra Trucker", precio: 12000, stock: 0, categoria: "Accesorios", color: "Rojo" },
    // ... más datos
  ]
}

export default async function InventoryPage() {
  const data = await getProducts();

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Inventario</h1>
            <p className="text-stone-500 dark:text-stone-400">Gestiona tus productos, precios y stock.</p>
        </div>
        <Link href="/dashboard/products/add">
            <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Nuevo Producto
            </Button>
        </Link>
      </div>

      {/* LA TABLA POTENTE */}
      <div className="container mx-auto py-2">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}