'use client';

import Link from 'next/link';
import {usePathname } from 'next/navigation';
import { cn } from '@/core/utils/utils'; // Utilidad de Shadcn para combinar clases
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  PlusCircle,
} from 'lucide-react';
const sidebarItems = [
  { name: 'Inicio', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Realizar venta', href: '/dashboard/sale', icon: ShoppingCart },
  { name: 'Inventario', href: '/inventory', icon: Package },
  { name: 'Agregar Producto', href: '/add-product', icon: PlusCircle },
];


export function Sidebar() {
  const pathname = usePathname(); // Hook para saber en qué ruta estamos (Active Link)

  return (
    <div className="flex h-full flex-col gap-2">
      {/* HEADER DEL SIDEBAR */}
      <div className="flex h-14 items-center border-b px-4 lg:h-12.5 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6 text-stone-900 dark:text-stone-50" />
          <span className="text-lg font-bold text-stone-900 dark:text-stone-50">Stock Flow</span>
        </Link>
      </div>

      {/* ITEMS DE NAVEGACIÓN */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1 text-sm font-medium lg:px-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary hover:border",
                  isActive 
                    ? "bg-trasnparent border text-stone-900 dark:text-stone-50" 
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* FOOTER DEL SIDEBAR (Logout) */}
      {/* <div className="mt-auto p-4">
        <form action={async () => { await signOut() }}>
            CAMBIOS:
              1. variant="ghost" (quita el borde)
              2. className: Agregamos clases para igualar el estilo de los Links
                  (text-muted-foreground, hover:text-primary, justify-start, padding)
            
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-primary hover:bg-stone-100 dark:hover:bg-stone-800 transition-all" 
              type="submit"
            >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
            </Button>
        </form>
      </div> */}
    </div>
  );
}