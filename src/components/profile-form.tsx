'use client'; 

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateProfileAction } from '@/actions/user.actions';
import { ActionState } from '@/lib/utils/safe-actions';
import { Profile } from '@/types'; // 👈 Importamos el tipo Profile

// CORRECCIÓN 1: El estado inicial debe coincidir con el tipo de retorno de la Acción.
// Usamos ActionState<Profile>. Como 'data' es opcional (data?: T) en ActionState,
// podemos omitirlo aquí y TypeScript es feliz.
const initialState: ActionState<Profile> = {
  success: false,
  error: undefined 
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Guardando...' : 'Actualizar Perfil'}
    </button>
  );
}

export function ProfileForm() {
  // CORRECCIÓN 2: Tipado explícito de los argumentos.
  // prevState debe ser del mismo tipo que el retorno (ActionState<Profile>).
  const handleFormSubmit = async (prevState: ActionState<Profile>, formData: FormData): Promise<ActionState<Profile>> => {
    const rawData = Object.fromEntries(formData);
    // TypeScript ahora sabe que esto devuelve ActionState<Profile>
    return updateProfileAction(rawData);
  };

  const [state, dispatch] = useActionState(handleFormSubmit, initialState);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Mi Perfil</h2>
      
      {/* Mensajes de Error Global */}
      {!state.success && state.error && !state.error.fieldErrors && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm border border-red-200">
          ⚠️ {state.error.message}
        </div>
      )}

      {/* Mensaje de Éxito */}
      {state.success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm border border-green-200">
          ✅ Perfil actualizado correctamente.
        </div>
      )}

      <form action={dispatch} className="space-y-4">
        
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-slate-700 mb-1">
            Nombre Completo
          </label>
          {/* defaultValue: Si ya tenemos datos (state.data), los mostramos */}
          <input
            id="full_name"
            name="full_name"
            type="text"
            defaultValue={state.data?.full_name || ''} 
            placeholder="Ej: Juan Pérez"
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.error?.fieldErrors?.full_name && (
            <p className="mt-1 text-sm text-red-600">
              {state.error.fieldErrors.full_name[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="avatar_url" className="block text-sm font-medium text-slate-700 mb-1">
            Avatar URL
          </label>
          <input
            id="avatar_url"
            name="avatar_url"
            type="text"
            defaultValue={state.data?.avatar_url || ''}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}