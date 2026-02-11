'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/resource/authResource';
import { Profile } from '@/types';

export function UserNav({user}: {user: Profile}) {
  const initials = user?.name?.substring(0, 2).toUpperCase() || 'U';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="User" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-45 bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground pt-1">
              {user?.email || "Sin sesión activa"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {/* <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>Perfil</DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>Facturación</DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer pb-3 pt-1'>
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}