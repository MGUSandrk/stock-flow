'use client'

import { useState, useEffect } from "react"
import { Product } from "@/types/index"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Trash2, PlusCircle } from "lucide-react"

interface EditProps { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

export function EditProductDialog({ open, onOpenChange, product, onSave }: EditProps) {
  const [formData, setFormData] = useState<Product>(product)
  
  // Estado local para manejar las features como Array [{key, value}] para poder iterar en el form
  const [featuresList, setFeaturesList] = useState<{key: string, value: string}[]>([])

  // Al abrir, convertimos el Objeto features a Array
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(product)
      const list = Object.entries(product.features || {}).map(([key, value]) => ({ key, value }))
      setFeaturesList(list)
    }
  }, [product, open])

  // --- HANDLERS PARA FEATURES ---
  const updateFeature = (index: number, field: 'key' | 'value', text: string) => {
    const newList = [...featuresList]
    newList[index][field] = text
    setFeaturesList(newList)
  }

  const removeFeature = (index: number) => {
    const newList = featuresList.filter((_, i) => i !== index)
    setFeaturesList(newList)
  }

  const addFeature = () => {
    setFeaturesList([...featuresList, { key: "", value: "" }])
  }

  // --- GUARDADO ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reconvertir Array a Objeto
    const featuresObject = featuresList.reduce((acc, curr) => {
      if (curr.key.trim()) acc[curr.key] = curr.value
      return acc
    }, {} as Record<string, string>)

    onSave({
      ...formData,
      features: featuresObject
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-50 dark:bg-neutral-950">
        <DialogHeader>
          <DialogTitle className="pt-3 text-2xl">Editar Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          
          {/* DATOS BÁSICOS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Nombre</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Precio Venta</Label>
              <Input 
                id="salePrice" 
                type="number"
                value={formData.salePrice} 
                onChange={(e) => setFormData({...formData, salePrice: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costPrice">Costo (Interno)</Label>
              <Input 
                id="costPrice" 
                type="number"
                value={formData.costPrice} 
                onChange={(e) => setFormData({...formData, costPrice: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input 
                id="stock" 
                type="number"
                value={formData.stock} 
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} 
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Input 
                id="category" 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
              />
            </div>
          </div>

          {/* EDICIÓN DE CARACTERÍSTICAS DINÁMICAS */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label>Características Dinámicas</Label>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <PlusCircle className="w-4 h-4 mr-2" /> Agregar
              </Button>
            </div>
            
            <div className="space-y-2">
              {featuresList.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input 
                    placeholder="Clave (ej: Color)" 
                    value={item.key} 
                    onChange={(e) => updateFeature(index, 'key', e.target.value)}
                    className="flex-1"
                  />
                  <Input 
                    placeholder="Valor (ej: Rojo)" 
                    value={item.value} 
                    onChange={(e) => updateFeature(index, 'value', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {featuresList.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-2">Sin características asignadas.</p>
              )}
            </div>
          </div>

          <DialogFooter >
            <Button type="submit" variant="outline">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}