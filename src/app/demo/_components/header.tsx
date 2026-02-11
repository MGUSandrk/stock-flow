'use client';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Sidebar } from './sidebar'; // Reutilizamos el Sidebar dentro del Sheet para móvil
import { UserNav } from './user-nav'; // Crearemos esto abajo
import { ThemeToggle } from '@/components/theme/theme-toggle'; // Crearemos esto para dark mode
import { Profile } from '@/types';

export function DashboardHeader({user}: {user: Profile}) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[50px] lg:px-6">
      {/* MOBILE TRIGGER */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-64">
           {/* Reutilizamos el componente Sidebar aquí adentro */}
           <Sidebar />
        </SheetContent>
      </Sheet>

      {/* ESPACIADOR */}
      <div className="w-full flex-1">
        {/* Aquí podrías poner una barra de búsqueda global */}
      </div>

      {/* ACCIONES DERECHA */}
      <ThemeToggle />
      <UserNav user={user} />
    </header>
  );
}