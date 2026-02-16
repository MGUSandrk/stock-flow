import { ProductForm } from "@/components/products/add-product";

export default function AddProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agregar Nuevo Producto</h1>
        <p>Completa la información para añadir un nuevo producto a tu inventario.</p>
      </div>
      <ProductForm />
    </div>
  )
}