import { Sidebar } from './_components/sidebar';
import { DashboardHeader } from './_components/header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userData = {
    name: "Usuario de Prueba", // Fallback si no tiene nombre
    email: "usario@prueba.com",
    avatar: "", // Fallback si no tiene foto
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
      {/* 1. SIDEBAR DESKTOP (Oculto en móvil) */}
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>

      {/* 2. ÁREA PRINCIPAL */}
      <div className="flex flex-col">
        {/* Header (Contiene el trigger del Sidebar Móvil) */}
        <DashboardHeader user={userData} />
        
        {/* Contenido dinámico (Outlet) */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-5 bg-stone-50 dark:bg-stone-950">
          {children}
        </main>
      </div>
    </div>
  );
}