'use client'

import { useEffect, useState } from "react"
import { BatchFeatures, Product } from "@/core/utils/types"
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
import { Calendar, Loader2, Plus, PlusCircle, Trash2 } from "lucide-react"

// --- DIALOGO DE CARACTERÍSTICAS (Solo Lectura) ---
export function FeaturesDialog({ 
  open, 
  onOpenChange, 
  features 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  features: BatchFeatures
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
  const [featuresList, setFeaturesList] = useState<{key: string, value: string}[]>([])

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


  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Convertimos el array [{key, value}] -> { key: value }
  const metadataAsObject = featuresList.reduce((acc, curr) => {
    if (curr.key.trim()) {
      acc[curr.key.trim()] = curr.value;
    }
    return acc;
  }, {} as Record<string, string>);

  const updatedProduct = {
    ...formData,
    features: metadataAsObject
  };

  onSave(updatedProduct);
  onOpenChange(false);
};

 useEffect(() => {
  // if (product && product.features) {
  //   // Transformamos el objeto { Color: "Rojo" } -> [{ key: "Color", value: "Rojo" }]
  //   const initialFeatures = Object.entries(product.features).map(([key, value]) => ({
  //     key,
  //     value: String(value)
  //   }));
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setFeaturesList(initialFeatures);
  //   setFormData(product); // Sincronizamos el resto del form
  // }
}, [product]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-neutral-50 dark:bg-neutral-950">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>Modifica los valores del producto aquí.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-row gap-x-3">
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
                value={formData.sale_price} 
                onChange={(e) => setFormData({...formData, sale_price: Number(e.target.value)})} 
                className="col-span-3" 
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input 
                id="stock" 
                type="number"
                value={formData.stock} 
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} 
                className="col-span-3" 
              />
          </div> */}
          </div>
          {/* FEATURES */}
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
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
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
                  
                </div>
              ))}
              {featuresList.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-2">Sin características asignadas.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">
                Cerrar
              </Button>
            <Button type="submit" variant="outline">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export function AddBatchDialog({ 
  open, 
  onOpenChange, 
  product,
  onConfirm
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  product: Product;
  onConfirm: (batchData: unknown) => void;
}){
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const batchData = {
      product_id: product?.id,
      purchase_price: Number(formData.get('purchase_price')),
      initial_quantity: Number(formData.get('initial_quantity')),
      expiration_date: formData.get('expiration_date') || null,
    }

    await onConfirm(batchData)
    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-neutral-50 dark:bg-neutral-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Nuevo Lote para {product?.name}
          </DialogTitle>
          <DialogDescription>
            Registra una nueva entrada de mercadería. El stock se sumará al total actual.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-lg border-l-4 border-l-primary bg-muted/30">
            <div className="space-y-2">
              <Label htmlFor="purchase_price">Precio de Compra</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-muted-foreground text-sm">$</span>
                <Input 
                  id="purchase_price" 
                  name="purchase_price" 
                  type="number" 
                  step="0.01" 
                  className="pl-7" 
                  placeholder="0.00" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initial_quantity">Cantidad Entrante</Label>
              <Input 
                id="initial_quantity" 
                name="initial_quantity" 
                type="number" 
                required 
                min={1} 
                placeholder='Ej: 50'
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiration_date">Vencimiento (Opcional)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="expiration_date" 
                  name="expiration_date" 
                  type="date" 
                  className="pl-10" 
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="outline"  disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Agregar Lote
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}