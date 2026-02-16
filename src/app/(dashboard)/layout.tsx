import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { AuthService } from '@/core/services/AuthService';
import { redirect } from 'next/navigation';
import { organizationService } from '@/core/services/OrganizationService';
import { UserService } from '@/core/services/UserService';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const user = await UserService.getUser()

  if (!user) {
    redirect('/login')
  }

  const organization = await organizationService.getOrganizationByUser(user.id)// 

  const userData = {
    name: user.user_metadata?.full_name || "Usuario", // Fallback si no tiene nombre
    email: user.email || "",
    avatar: user.user_metadata?.avatar_url || "", // Fallback si no tiene foto
  }
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stone-50 dark:bg-stone-950">
      
      {/* --- CAPA 0: EFECTOS DE FONDO GLOBALES --- */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} 
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#009dff] to-[#faca50] opacity-20 dark:opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
          />
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} 
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 dark:opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
          />
        </div>
      </div>

      {/* --- CAPA 1: APLICACIÓN (UI) --- */}
      <div className="relative z-10 grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        
        {/* Sidebar con fondo semi-transparente para dejar ver el brillo */}
        <div className="hidden border-r bg-white/1 dark:bg-stone-950/1 backdrop-blur-sm md:block">
          <Sidebar />
        </div>

        <div className="flex flex-col">
          {/* Header con backdrop blur */}
          <div className="sticky top-0 z-20 bg-white/1 dark:bg-stone-950/1 backdrop-blur-sm">
            <DashboardHeader user={userData} />
          </div>
          
          {/* Contenido principal transparente */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}