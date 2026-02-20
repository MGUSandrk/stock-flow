'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Usando tu toolkit de Shadcn
import { createOrganization } from '@/core/resource/OrganizationResource';

// interface Props {
//   action: (formData: FormData) => Promise<void | { error: string }>;
// }

export function CreateOrganizationForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // setError('')
      setLoading(true)
  
      const formData = new FormData(e.currentTarget)
      const result = await createOrganization(formData)
  
      if (result?.error) {
        // setError(result.error)
        setLoading(false)
      }
    }

  return (
//     <form action={async (formData) => {
//       setLoading(true);
//       await action(formData);
//       setLoading(false);
//     }} 
    <div className="relative flex flex-col space-y-6 w-full max-w-md mx-auto p-8
                    bg-neutral-900/60 backdrop-blur-md 
                    rounded-2xl border border-white/10 shadow-2xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-white pt-5 ">¡Bienvenido a bordo!</h2>
        <p className="mt-2 text-neutral-400">Antes de empezar, necesitamos crear el espacio para tu empresa.</p>
      </div>
      <form className="space-y-6"
      onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
            Nombre de tu Empresa u Organización
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Ej: StockFlow Pro"
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-2.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5"
          disabled={loading}
        >
          {loading ? 'Configurando entorno...' : 'Crear mi organización'}
        </Button>
      </form>
    </div>
  );
}