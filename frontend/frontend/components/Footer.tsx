import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo y descripción */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">EcoLink</span>
            </Link>
            <p className="mt-4 text-green-100">
              Conectando personas con iniciativas ecológicas para crear un impacto positivo en nuestro planeta.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-green-200 hover:text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/actividades" className="text-green-200 hover:text-white">
                  Actividades
                </Link>
              </li>
              <li>
                <Link href="/impacto" className="text-green-200 hover:text-white">
                  Nuestro Impacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-green-200 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-green-200 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-green-300" />
                <a href="mailto:info@ecolink.org" className="text-green-200 hover:text-white">
                  info@ecolink.org
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-green-300" />
                <a href="tel:+525512345678" className="text-green-200 hover:text-white">
                  +56 9 1234 5678
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-green-300" />
                <span className="text-green-200">Jose Pedro Alessandri 1242, Ñuñoa</span>
              </li>
            </ul>
          </div>

          {/* Boletín */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Boletín Informativo</h3>
            <p className="mb-4 text-green-100">
              Suscríbete para recibir actualizaciones sobre nuevas actividades y noticias.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-green-700 border-green-600 text-white placeholder:text-green-300"
              />
              <Button className="bg-green-500 hover:bg-green-600 text-white">Suscribirse</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-green-700 pt-8 text-center text-sm text-green-300">
          <p>© {new Date().getFullYear()} EcoLink. Todos los derechos reservados.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/privacidad" className="hover:text-white">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}