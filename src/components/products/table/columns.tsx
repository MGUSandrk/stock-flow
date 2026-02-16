"use client"

import { Product } from "@/core/utils/types"
import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal, Plus } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { AddBatchDialog, EditProductDialog, FeaturesDialog } from "../dialog"

export const columns: ColumnDef<Product>[] = [
  
  {
    id: "expander",
    size: 10, 
    minSize: 30,
    maxSize: 30,
    header: () => null,
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => row.toggleExpanded()}
          className="hover:bg-transparent"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="font-extrabold">Nombre</div>,
  },
  {
    accessorKey: "category", // Ya mapeado en el service
    header: () => <div className="font-extrabold">Categoría</div>,
  },
  {
    accessorKey: "stock", // Este nombre debe existir en el objeto que le pasas a 'data'
    header: () => <div className="text-center font-extrabold">Stock</div>,
    cell: ({ row }) => {
      // TypeScript ahora reconocerá .stock porque lo agregamos a la interfaz Product
      const stock = row.original.stock 
      return (
        <div className={`text-center font-medium ${stock === 0 ? "text-red-500" : "text-green-500"}`}>
          {stock}
        </div>
      )
    }
  },
  {
    accessorKey: "sale_price",
    header: () => <div className="text-center font-extrabold">Precio Venta</div>,
    cell: ({ row }) => {
      const value = row.getValue("sale_price");
    
    // 3. Validar si es un número antes de formatear
    const amount = typeof value === 'number' ? value : parseFloat(value as string);

    if (isNaN(amount)) {
      return <div className="text-center font-medium text-muted-foreground">$ 0.00</div>;
    }

    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

    return <div className="text-center font-medium">{formatted}</div>;
  },
  },
  {
    accessorKey: "metadata",
    header: () => <div className="text-center font-extrabold">Caracteristicas</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [featureModalOpen, setFeatureModalOpen] = useState(false)
      const features = row.getValue("metadata") as Record<string, string>
      console.log("Features:", features) // Debug: Verificar el contenido de features
      return (
        <>
          <div className="flex justify-center">
            <Button variant="outline" size="sm"  onClick={() => setFeatureModalOpen(true)}>
              Ver
            </Button>
          </div>
          <FeaturesDialog
              open={featureModalOpen}
              onOpenChange={setFeatureModalOpen}
              features={features} />
        </>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [editModalOpen, setEditModalOpen] = useState(false)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [batchModalOpen, setBatchModalOpen] = useState(false)
      const selectedProduct = row.original as Product
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      

      return (
        <><DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-neutral-50 dark:bg-neutral-900">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => setEditModalOpen(true)}
            >
              Editar
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
    <DropdownMenuItem>View customer</DropdownMenuItem>
    <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => setBatchModalOpen(true)}>
             Agregar Lote
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
          <EditProductDialog
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            product={selectedProduct}
            onSave={()=>{}} />
          <AddBatchDialog 
              open={batchModalOpen} 
              onOpenChange={setBatchModalOpen}
              product={selectedProduct}
              onConfirm={async (data) => {
                const res = await createBatchAction(data) // Necesitamos crear esta action
              }}
            />
            
            </>
      )
    },
  },

]