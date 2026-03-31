
import { columns } from "@/components/products/table/columns";
import { DataTable } from "@/components/products/table/data-table";

export default async function InventoryPage() {

  const mockInventoryList = [
  {
    id: "prod_001",
    name: "Laptop Lenovo ThinkPad",
    sku: "LEN-TP-001",
    category_id: "cat_001",
    category: "Computadoras",
    sale_price: 1250.00,
    stock: 15, // Suma de current_quantity (10 + 5)
    batches: [
      {
        id: "batch_101",
        purchase_price: 900.00,
        initial_quantity: 20,
        current_quantity: 10,
        batch_number: "LOTE-2025-A",
        expiration_date: null,
        features: { color: "Negro", ram: "16GB" },
        created_at: new Date("2025-11-10T10:00:00Z")
      },
      {
        id: "batch_102",
        purchase_price: 880.00,
        initial_quantity: 5,
        current_quantity: 5,
        batch_number: "LOTE-2026-B",
        expiration_date: null,
        features: { color: "Gris", ram: "16GB" },
        created_at: new Date("2026-02-15T10:00:00Z")
      }
    ]
  },
  {
    id: "prod_002",
    name: "Monitor Samsung 27''",
    sku: "SAM-MON-27",
    category_id: "cat_002",
    category: "Periféricos",
    sale_price: 250.00,
    stock: 30, // Suma de current_quantity
    batches: [
      {
        id: "batch_103",
        purchase_price: 180.00,
        initial_quantity: 50,
        current_quantity: 30,
        batch_number: "LOTE-MON-01",
        expiration_date: null,
        features: { resolution: "4K", hz: "144hz" },
        created_at: new Date("2026-01-05T10:00:00Z")
      }
    ]
  },
  {
    id: "prod_003",
    name: "Auriculares Bluetooth Sony",
    sku: "SONY-BT-005",
    category_id: "cat_003",
    category: "Audio",
    sale_price: 99.99,
    stock: 0, // Producto sin stock actualmente
    batches: [
      {
        id: "batch_104",
        purchase_price: 60.00,
        initial_quantity: 100,
        current_quantity: 0,
        batch_number: "LOTE-AUD-99",
        expiration_date: null,
        features: { color: "Blanco", type: "Over-ear" },
        created_at: new Date("2025-08-20T10:00:00Z")
      }
    ]
  },
  {
    id: "prod_004",
    name: "Cápsulas de Café Espresso",
    sku: "CAF-ESP-50",
    category_id: "cat_004",
    category: "Insumos de Oficina",
    sale_price: 15.50,
    stock: 120, 
    batches: [
      {
        id: "batch_105",
        purchase_price: 8.00,
        initial_quantity: 200,
        current_quantity: 120,
        batch_number: "LOTE-CAFE-01",
        expiration_date: "2026-12-31T00:00:00Z", // Este sí tiene fecha de caducidad
        features: { intensity: "Fuerte", units: "50" },
        created_at: new Date("2026-03-01T10:00:00Z")
      }
    ]
  }
];

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
        <DataTable columns={columns} data={mockInventoryList} />
      </div>
    </div>
  );
}