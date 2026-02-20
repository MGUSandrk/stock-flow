'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Loader2, Calendar } from 'lucide-react'

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Actions & Types
import { createProductAction } from '@/core/resource/ProductResource'
import { BatchFeatures} from '@/core/utils/types'
import { createCategoryAction, getCategoriesAction } from '@/core/resource/CategoryResource'

export function ProductForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [features, setFeatures] = useState<{ key: string; value: string }[]>([])
  
  // Handlers para Features
  const addFeature = () => setFeatures([...features, { key: '', value: '' }])
  const removeFeature = (idx: number) => setFeatures(features.filter((_, i) => i !== idx))
  const updateFeature = (idx: number, field: 'key' | 'value', val: string) => {
    const newF = [...features]
    newF[idx][field] = val
    setFeatures(newF)
  }

  const handleCategoryChange = (value: string) => {
    if (value === 'new') setIsCategoryModalOpen(true)
    else setSelectedCategory(value)
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setLoading(true);
    const result = await createCategoryAction(newCategoryName);

    if (result.success && result.data) {
      setCategories((prev) => [...prev, result.data!]);
      setSelectedCategory(result.data.id);
      setIsCategoryModalOpen(false);
      setNewCategoryName('');
    } else {
      alert("Error al crear categoría: " + result.error);
    }
    setLoading(false);
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    const featuresList: BatchFeatures = features.reduce((acc, curr) => {
      if (curr.key.trim()) acc[curr.key.trim()] = curr.value
      return acc
    }, {} as BatchFeatures)

    // Inyectamos la features y la categoría seleccionada al FormData
    formData.append('features', JSON.stringify(featuresList))
    formData.append('category_id', selectedCategory)

    const result = await createProductAction(formData)

    if (result.success) {
      console.log("redireccion inventario")
      router.push('/inventory')
    } else {
      alert("Error: " + result.error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategoriesAction();
      if (result.success && result.data) {
        setCategories(result.data);
      }
    };
    loadCategories();
  }, [])

  return (
    <div className="max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-8 pb-10">
        
        {/* 1. INFORMACIÓN GENERAL */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* NOMBRE */}
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input id="name" name="name" required placeholder="Ej: Zapatillas Nike Air" />
              </div>
            {/* CODIGO */}
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <Label htmlFor="sku">SKU (Opcional)</Label>
                <Input id="sku" name="sku" placeholder="Ej: NK-AIR-001" />
              </div>
            </div>
            {/* Categoria */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <Label>Categoría</Label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                    <SelectItem value="new" className="text-primary font-medium">+ Crear nueva categoría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* PRECIO VENTA */}
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <Label htmlFor="sale_price">Precio de Venta</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1.5 text-muted-foreground">$</span>
                  <Input id="sale_price" name="sale_price" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. LOTE INICIAL */}
        <Card className="border-l-primary">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold tracking-wider text-primary">Lote Inicial</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchase_price">Precio de Compra</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1.5 text-muted-foreground">$</span>
                  <Input id="purchase_price" name="purchase_price" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initial_stock">Cantidad Inicial</Label>
                <Input id="initial_stock" name="initial_stock" type="number" required min={0} placeholder='0'/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiration_date">Vencimiento (Opcional)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="expiration_date" name="expiration_date" type="date" className="pl-10" />
                </div>
              </div>
            </div>
            {/* FEATURES */}
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Características Específicas</Label>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-2" /> Agregar campo
              </Button>
            </div>

            {features.map((item, index) => (
              <div key={index} className="flex gap-2 items-start animate-in slide-in-from-left-2">
                <Input 
                  placeholder="Ej: Color" 
                  value={item.key}
                  onChange={(e) => updateFeature(index, 'key', e.target.value)}
                  className="flex-1"
                />
                <Input 
                  placeholder="Ej: Rojo" 
                  value={item.value}
                  onChange={(e) => updateFeature(index, 'value', e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          <Button type="submit" variant="outline" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar
          </Button>
        </div>

        {/* DIALOG PARA CATEGORÍA */}
        <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
          <DialogContent className='bg-neutral-50 dark:bg-neutral-900'>
            <DialogHeader>
              <DialogTitle>Nueva Categoría</DialogTitle>
              <DialogDescription>Asigna un nombre a la nueva categoría de productos.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="catName">Nombre</Label>
              <Input 
                id="catName" 
                name='catName'
                value={newCategoryName} 
                onChange={(e) => setNewCategoryName(e.target.value)} 
                placeholder="Ej: Ferretería"
                disabled={loading}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCategoryModalOpen(false)} disabled={loading}>
                Cerrar
              </Button>
              <Button variant="outline" onClick={handleCreateCategory} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear Categoría
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  )
}