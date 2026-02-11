'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// UI Components
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export function ProductForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // --- ESTADO DE CATEGORÍAS ---
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // --- ESTADO DEL PRODUCTO ---
  const [features, setFeatures] = useState<{ key: string; value: string }[]>([])
  
  // Cargar categorías al montar
  useEffect(() => {
    // const fetchCategories = async () => {
    //   const supabase = createClient()
    //   const { data } = await supabase.from('categories').select('id, name')
    //   if (data) setCategories(data)
    // }
    // fetchCategories()
  }, [])

  // --- LÓGICA DE CATEGORÍA ---
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return
    
    // const result = await createCategory(newCategoryName)
    
    // if (result.success && result.data) {
    //   // Agregamos la nueva categoría a la lista local
    //   setCategories([...categories, result.data])
    //   // La seleccionamos automáticamente
    //   setSelectedCategory(result.data.id)
    //   // Cerramos modal y limpiamos
    //   setIsCategoryModalOpen(false)
    //   setNewCategoryName('')
    //   alert("Categoría creada")
    // } else {
    //   alert("Error al crear categoría")
    // }
    alert("Categoría creada")
  }

  // Detectar si seleccionan "Crear nueva..." en el Select
  const handleCategoryChange = (value: string) => {
    if (value === 'new') {
      setIsCategoryModalOpen(true)
    } else {
      setSelectedCategory(value)
    }
  }

  // --- LÓGICA DE FEATURES DINÁMICAS ---
  const addFeature = () => setFeatures([...features, { key: '', value: '' }])
  const removeFeature = (idx: number) => setFeatures(features.filter((_, i) => i !== idx))
  const updateFeature = (idx: number, field: 'key' | 'value', val: string) => {
    const newF = [...features]
    newF[idx][field] = val
    setFeatures(newF)
  }

  // --- ENVÍO FINAL ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Transformar features array a objeto JSON
    const featuresJson = features.reduce((acc, curr) => {
      if (curr.key) acc[curr.key] = curr.value
      return acc
    }, {} as Record<string, string>)

    const payload = {
      name: formData.get('name'),
      categoryId: selectedCategory,
      stock: Number(formData.get('stock')),
      costPrice: Number(formData.get('costPrice')),
      salePrice: Number(formData.get('salePrice')),
      features: featuresJson
    }

    // const result = await createProduct(payload)

    // if (result.success) {
    //   alert("Producto creado exitosamente")
    //   router.push('/dashboard/products')
    // } else {
    //   alert("Error: " + result.error)
    // }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
    
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      
      {/* 1. INFORMACIÓN BÁSICA */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label  htmlFor="name">Nombre del Producto</Label>
            <Input id="name" name="name" required placeholder="Ej: Zapatillas Nike Air" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* SELECTOR INTELIGENTE DE CATEGORÍA */}
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
                  {/* Opción especial que abre el modal */}
                  <SelectItem value="new" className="text-blue-500 font-medium cursor-pointer bg-blue-50 dark:bg-blue-900/20">
                    + Crear nueva categoría
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="stock">Stock Inicial</Label>
              <Input id="stock" name="stock" type="number" required defaultValue={0} min={0} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. PRECIOS */}
      <Card>
        <CardContent className="pt-6 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="costPrice">Precio Compra (Costo)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1.5 text-muted-foreground">$</span>
              <Input id="costPrice" name="costPrice" type="number" step="0.01" className="pl-7" placeholder="0.00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salePrice">Precio Venta</Label>
            <div className="relative">
              <span className="absolute left-3 top-1.5 text-muted-foreground">$</span>
              <Input id="salePrice" name="salePrice" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. CARACTERÍSTICAS DINÁMICAS */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Detalles Específicos</Label>
            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
              <Plus className="w-4 h-4 mr-2" /> Agregar característica
            </Button>
          </div>

          {features.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Agrega detalles como Color, Talle, Material, etc.
            </p>
          )}

          {features.map((item, index) => (
            <div key={index} className="flex gap-2 items-start animate-in slide-in-from-left-2">
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
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
        <Button type="submit" variant="outline" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar Producto
        </Button>
      </div>

      {/* --- MODAL (DIALOG) PARA CREAR CATEGORÍA --- */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent className="sm:max-w-md bg-neutral-50 dark:bg-neutral-900">
          <DialogHeader>
            <DialogTitle>Nueva Categoría</DialogTitle>
            <DialogDescription>
              Crea una categoría para organizar tu inventario.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="catName">Nombre</Label>
              <Input 
                id="catName" 
                placeholder="Ej: Electrónica" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryModalOpen(false)}>Cancelar</Button>
            <Button variant="outline" onClick={handleCreateCategory}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </form>
    </div>
  )
}