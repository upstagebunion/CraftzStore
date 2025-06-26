'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 bg-background2">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8 text-center">
        ¡Vaya! Parece que la página que buscas no existe.
      </h2>

      {/* Contenedor de la imagen */}
      <div className="w-full max-w-sm relative aspect-square mb-8">
        <Image
          src="/404.png"
          alt="Página no encontrada"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl shadow-lg"
        />
      </div>

      <p className="text-lg text-center">
        No te preocupes, puedes volver a la página de inicio o explorar otras secciones.
      </p>

      <button
        onClick={handleGoBack}
        className="mt-6 px-6 py-3 bg-primary text-white font-semibold cursor-pointer rounded-lg shadow-md hover:bg-primary2 transition duration-300"
      >
        Volver a la página anterior
      </button>

      {/* Botón para volver al inicio */}
      <a
        href="/"
        className="mt-6 px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-primary hover:bg-primary2 transition duration-300"
      >
        Volver al inicio
      </a>
    </div>
  );
}