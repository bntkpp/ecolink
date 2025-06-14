"use client";
import React from "react";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6" />
          <span className="text-xl font-bold">EcoLink</span>
        </Link>

        {/* Navegación */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/inicio" className="px-4 py-2 hover:text-green-200 transition-colors">
                  Inicio
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                    className="bg-transparent text-white hover:text-green-200 focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-green-200 shadow-none"
                    >
                    Actividades
               </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                  <ListItem href="/actividades/reforestacion" title="Reforestación">
                    Plantación de árboles y restauración ecológica
                  </ListItem>
                  <ListItem href="/actividades/limpieza" title="Limpieza">
                    Limpiezas comunitarias y recolección de residuos
                  </ListItem>
                  <ListItem href="/actividades/reciclaje" title="Reciclaje">
                    Campañas de reciclaje y reutilización
                  </ListItem>
                  <ListItem href="/actividades/educacion" title="Educación">
                    Talleres ambientales y difusión educativa
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/impacto" className="px-4 py-2 hover:text-green-200 transition-colors">
                  Impacto
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/educacion" className="px-4 py-2 hover:text-green-200 transition-colors">
                  Educación
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/lideres" className="px-4 py-2 hover:text-green-200 transition-colors">
                  Líderes
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Botón de login o simulación de autenticación */}
        <Button
          variant="outline"
          className="bg-white text-green-600 hover:bg-green-100"
          onClick={() => alert("Autenticación aún no implementada")}
        >
          Iniciar Sesión
        </Button>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md p-3 leading-none no-underline hover:bg-green-100 hover:text-green-800 transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-gray-600">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
