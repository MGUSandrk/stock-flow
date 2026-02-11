import { DataTable } from "@/components/products/data-table";
import { columns } from "@/components/products/columns";
import { MOCK_PRODUCTS } from "@/components/products/mock-products";

export default async function InventoryPage() {
  const data = MOCK_PRODUCTS

  return (
    <div className="flex flex-col gap-1">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Inventario</h1>
            <p className="text-stone-500 dark:text-stone-400">Gestiona tus productos, precios y stock.</p>
        </div>
      </div>

      {/* LA TABLA POTENTE */}
      <div className="container mx-auto py-2">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}