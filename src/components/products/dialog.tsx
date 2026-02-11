'use client'

import { useState } from "react"
import { Product } from "@/types/index"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// --- DIALOGO DE CARACTERÍSTICAS (Solo Lectura) ---
export function FeaturesDialog({ 
  open, 
  onOpenChange, 
  features 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  features: Record<string, string> 
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-neutral-50 dark:bg-neutral-950">
        <DialogHeader>
          <DialogTitle>Detalles del Producto</DialogTitle>
          <DialogDescription>Características específicas dinámicas.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {Object.entries(features).map(([key, value]) => (
            <div key={key} className="flex flex-col space-y-1 p-3 border rounded-md bg-muted/50">
              <span className="text-xs font-medium text-muted-foreground uppercase">{key}</span>
              <span className="text-sm font-semibold">{value}</span>
            </div>
          ))}
          {Object.keys(features).length === 0 && (
            <p className="col-span-2 text-center text-muted-foreground text-sm">Sin características extra.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- DIALOGO DE EDICIÓN ---
export function EditProductDialog({ 
  open, 
  onOpenChange, 
  product,
  onSave 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  product: Product;
  onSave: (updatedProduct: Product) => void;
}) {
  const [formData, setFormData] = useState(product)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData) // Pasamos los datos al padre
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>Modifica los valores del producto aquí.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Precio</Label>
            <Input 
              id="price" 
              type="number"
              value={formData.salePrice} 
              onChange={(e) => setFormData({...formData, salePrice: Number(e.target.value)})} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">Stock</Label>
            <Input 
              id="stock" 
              type="number"
              value={formData.stock} 
              onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} 
              className="col-span-3" 
            />
          </div>
          {/* Aquí podrías agregar lógica para editar features también */}
          <DialogFooter>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}