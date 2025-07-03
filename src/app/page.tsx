import HeroSection from '@/components/home-page/hero-section'
import Carousel from '@/components/home-page/carousel';
import Image from 'next/image';
import CategoriesBannersCarousel from '@/components/home-page/categories-banners-carousel';
import FeatureCarousel from '@/components/home-page/feature-carousel';
import ReviewsCarousel from '@/components/home-page/reviews-carousel';
import { ProductCard } from '@/components/products/listed-products/product-card';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Carousel Section */}
      <Carousel />

      {/*key qualities*/}
      <FeatureCarousel />

      {/*Categories Banner Carousel*/}
      <CategoriesBannersCarousel />

      {/* Featured Products */}
      <section className="bg-background2 py-16 mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Productos Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product cards would go here */}
          <ProductCard 
            key={0}
            id={'playera-manga-corta-por-algo-traigo-audifonos'}
            image={`https://res.cloudinary.com/craftzstorage/image/upload/v1751499155/Shirt_Front_3D_72_ppp4_gaunmu.jpg`}
            category="Electrónicos"
            title={`Producto 1`}
            price={[219.00, 269.00]}
            isWishlisted={false}
          />
        </div>
      </section>

      {/* Reviews Carousel */}
      <ReviewsCarousel />

      {/* Value Proposition */}
      <section className="bg-gray-100 text-overWhite py-16">
        <div className="mx-auto px-4">
          <div className="text-center max-w-250 mx-auto">
            <h2 className="text-3xl font-bold mb-2">Por Qué Elegirnos</h2>
            <p className="mb-5">
              En Craftz, entendemos que cada persona es única y especial. <br/>
              Es por eso que nos esforzamos por ofrecer una experiencia de compra 
              personalizada que satisfaga todas tus necesidades y expectativas. 
              Nuestro compromiso con la calidad, la innovación y la atención al cliente
              nos distingue como la mejor opción para aquellos que buscan prendas que
              reflejen su estilo y personalidad.
            </p>
            {/* TODO: Cambiar a carousel tambien (especialmente en movil) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-2">Compromiso con la Calidad</h3>
                <p>Nos comprometemos a ofrecer productos de la más alta calidad en cada paso del proceso, desde la selección de materiales hasta la confección final. Utilizamos solo algodón 100% suave y cómodo en todas nuestras prendas, garantizando así la máxima comodidad y durabilidad para nuestros clientes.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Innovación y Creatividad</h3>
                <p>En Craftz, la creatividad no tiene límites. Nos enorgullece ofrecer una amplia gama de opciones de personalización para que puedas expresar tu estilo único. Desde estampados vibrantes hasta diseños personalizados, nuestro objetivo es ayudarte a destacar y destacar en cualquier ocasión.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Atención al Cliente Excepcional</h3>
                <p>En Craftz, tu satisfacción es nuestra máxima prioridad. Nuestro equipo dedicado de atención al cliente está aquí para ayudarte en cada paso del proceso, desde la selección de productos hasta la entrega final. Estamos comprometidos a brindarte una experiencia de compra sin igual y a garantizar que tus necesidades sean atendidas de manera rápida y eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}