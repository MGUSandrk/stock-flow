"use client"

import { Product } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FeaturesDialog } from "./dialog"
import { useState } from "react"
import { EditProductDialog } from "./edit-dialog"



export const columns: ColumnDef<Product>[] = [
  
  {
    accessorKey: "name",
    header: () => <div className="font-extrabold">Nombre</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="font-extrabold">Categoria</div>,
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center font-extrabold">Stock</div>,
    cell: ({ row }) => {
      return (
        <div className={`text-center font-medium ${row.getValue("stock") === 0 ? "text-red-500" : "text-green-500"}`}>
          {row.getValue("stock")}
        </div>
      )
    }
  },
  {
    accessorKey: "costPrice",
    header: () => <div className="text-center font-extrabold">Precio de compra</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("costPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "salePrice",
    header: () => <div className="text-center font-extrabold">Precio de Venta</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("salePrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "features",
    header: () => <div className="text-center font-extrabold">Caracteristicas</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [featureModalOpen, setFeatureModalOpen] = useState(false)
      const features = row.getValue("features") as Record<string, string>
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
      const selectedProduct = row.original as Product
      return (
        <><DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-neutral-50 dark:bg-neutral-800">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => setEditModalOpen(true)}
            >
              Editar
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
    <DropdownMenuItem>View customer</DropdownMenuItem>
    <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
          <EditProductDialog
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            product={selectedProduct}
            onSave={()=>{}} /></>
      )
    },
  },

]