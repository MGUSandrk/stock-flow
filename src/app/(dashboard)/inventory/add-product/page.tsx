import { ProductForm } from "@/components/products/addProduct";

export default function AddProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Agregar Nuevo Producto</h1>
        <p className="text-stone-500 dark:text-stone-400">Completa la información para añadir un nuevo producto a tu inventario.</p>
      </div>
      <ProductForm />
    </div>
  )
}