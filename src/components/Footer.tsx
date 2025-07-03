import Link from 'next/link'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Craftz - La mejor opción para regalos y personalización.</h3>
            <p className="text-sm">
              Nos dedicamos a transformar ideas en productos únicos y de alta calidad. Nuestra pasión por la personalización y el detalle se refleja en cada prenda y accesorio que creamos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-1">Enlaces Rápidos</h4>
            <ul className="space-y-2 mb-4">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
            <h4 className="text-lg font-semibold mb-1">Enlaces Importantes</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Aviso de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                <span>León, Guanajuato</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>477 838 9660</span>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>contacto@craftzstore.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="socialMedia">
            <h4 className="text-lg font-semibold mb-4">Redes Sociales</h4>
            <div className="flex flex-wrap gap-3">
              <Link href="https://www.facebook.com/craftz.escucha" className="p-2 rounded-full hover:bg-blue-600 transition" target="_blank">
                <span className="sr-only">Facebook</span>
                {/* Replace with actual icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="https://www.instagram.com/craftz.personaliza" className="p-2 rounded-full hover:bg-pink-600 transition" target="_blank">
                <span className="sr-only">Instagram</span>
                {/* Replace with actual icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              <Link href="https://wa.me/5214778389660" className="p-2 rounded-full hover:bg-green-400 transition" target="_blank">
                <span className="sr-only">WhatsApp</span>
                {/* Replace with actual icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"/>
                  
                </svg>
              </Link>
            </div>
            <div className="pagos mt-4">
              <p className="text-sm">
                Aceptamos pagos con:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {/* Payment icons - you can use actual payment provider icons */}
                <span className="px-2 py-1 rounded text-xs">Tarjeta</span>
                <span className="px-2 py-1 rounded text-xs">MercadoPago</span>
                <span className="px-2 py-1 rounded text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Craftz México. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}