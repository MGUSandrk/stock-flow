import Link from 'next/link';
import { 
  PieChart, 
  ShoppingBag, 
  DollarSign, 
  PlusCircle, 
  Package, 
  ShoppingCart 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthService } from '@/core/services/AuthService';

export default async function DashboardPage() {
  
  // Datos simulados (Mock)
  const metrics = {
    totalProducts: 1240,
    categories: 12,
    productsSold: 85,
  };
  const name = "Usuario de Prueba"
  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. TÍTULO DE BIENVENIDA */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Bienvenido {name} 👋
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Resumen general de tu inventario y acciones rápidas.
        </p>
      </div>

      {/* 2. GRILLA DE MÉTRICAS */}
      <div className="grid gap-4 md:grid-cols-3">
        
        {/* Métrica 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.categories}</div>
            <p className="text-xs text-muted-foreground">Activas en el sistema</p>
          </CardContent>
        </Card>

        {/* Métrica 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+180 desde el mes pasado</p>
          </CardContent>
        </Card>

        {/* Métrica 3 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.productsSold}</div>
            <p className="text-xs text-muted-foreground">+12% respecto a promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. ACCIONES RÁPIDAS (Botones Grandes) */}
      <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50 mt-4">
        Acciones Rápidas
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Acción 1: Ver Inventario */}
        <Link href="/demo/inventory" className="group">
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-fuchsia-500 dark:hover:border-fuchsia-500 transition-all duration-300">
            <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-full mb-4 group-hover:bg-fuchsia-100 dark:group-hover:bg-fuchsia-900/50 transition-colors">
              <ShoppingBag className="w-8 h-8 text-stone-500 dark:text-stone-400 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Ver Inventario</h3>
            <p className="text-sm text-stone-500 text-center mt-2">Gestiona tu stock actual</p>
          </div>
        </Link>

        {/* Acción 2: Agregar Producto */}
        <Link href="/demo/add-product" className="group">
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
            <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-full mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
              <PlusCircle className="w-8 h-8 text-stone-500 dark:text-stone-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Agregar Producto</h3>
            <p className="text-sm text-stone-500 text-center mt-2">Registra nueva mercadería</p>
          </div>
        </Link>

        {/* Acción 3: Realizar Venta */}
        <Link href="/demo/dashboard/sale" className="group">
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-green-500 dark:hover:border-green-500 transition-all duration-300">
            <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-full mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
              <ShoppingCart className="w-8 h-8 text-stone-500 dark:text-stone-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Realizar Venta</h3>
            <p className="text-sm text-stone-500 text-center mt-2">Registrar salida de stock</p>
          </div>
        </Link>

      </div>
    </div>
  );
}