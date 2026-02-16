import { columns } from "@/components/products/table/columns";
import { DataTable } from "@/components/products/table/data-table";
import { productService } from "@/core/services/ProductService";


export default async function InventoryPage() {
  
  const data = await productService.getAllWithBatches();

  return (
    <div className="flex flex-col gap-6 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
        <p className="text-muted-foreground">Gestiona tus productos por lotes.</p> 
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}