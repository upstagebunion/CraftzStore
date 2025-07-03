'use client';
import { motion } from 'framer-motion';

export default function AnimatedComponentsAboutPage(){
    // Animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">¿Quiénes somos?</h1>
            <p className="text-lg md:text-xl leading-relaxed">
              En Craftz, nuestra pasión por la moda y la creatividad nos impulsa a ofrecer productos únicos y personalizados que reflejen la individualidad de cada cliente. Desde nuestros inicios, nos hemos comprometido a proporcionar prendas de calidad y un servicio excepcional, estableciendo así un vínculo duradero con nuestra comunidad de clientes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nuestra Filosofía */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Somos tu mejor opción para la personalización
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground/90 text-lg mb-6">
              En Craftz, entendemos que cada persona es única y especial. Es por eso que nos esforzamos por ofrecer una experiencia de compra personalizada que satisfaga todas tus necesidades y expectativas.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-foreground/90 text-lg">
              Nuestro compromiso con la calidad, la innovación y la atención al cliente nos distingue como la mejor opción para aquellos que buscan prendas que reflejen su estilo y personalidad.
            </motion.p>
          </motion.div>

          {/* Tarjetas de Valores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-feature1 to-feature1/70 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-indigo-600 text-4xl mb-4">💖</div>
              <h3 className="text-xl font-bold text-foreground mb-3">¡Eres importante!</h3>
              <p className="text-foreground">
                En Craftz, tú eres nuestra prioridad número uno. Nos comprometemos a brindarte la mejor experiencia de compra posible, desde la selección de productos hasta el proceso de personalización.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-feature2 to-feature2/70 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-indigo-600 text-4xl mb-4">👕</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Máxima Comodidad</h3>
              <p className="text-foreground">
                Nuestras prendas están confeccionadas con algodón 100% suave y cómodo, para brindarte la máxima comodidad y estilo en cada uso.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-feature3 to-feature3/70 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1"
            >
              <div className="text-indigo-600 text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-foreground mb-3">Nosotros Hacemos Tu Diseño</h3>
              <p className="text-foreground">
                Nuestro talentoso equipo de diseñadores trabajará contigo para crear una pieza única y memorable que refleje tu personalidad y gustos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Calidad */}
      <section className="py-16 bg-background2">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Estampados de Alta Duración</h2>
            <p className="text-foreground text-lg">
              Utilizamos tecnología de vanguardia para garantizar que nuestros diseños mantengan su color y calidad incluso después de múltiples lavados. Con una resistencia probada de al menos 50 lavadas, puedes confiar en que tu prenda lucirá como nueva por mucho tiempo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Banner de Productos */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Explora nuestros productos</h2>
            <p className="text-xl mb-8">Descubre nuestra colección de productos personalizables</p>
            <a 
              href="/products" 
              className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Ver Catálogo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¡La mejor calidad para personalizar tus playeras, tazas y mucho más!
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground text-lg mb-8">
              Si no encuentras lo que deseas, ¡Contáctanos y nosotros encontraremos alguna opción que funcione!
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {['Regalos personales', 'Regalos Ocasionales', 'A la medida', 'Playeras de pareja', 'Playeras Únicas', 'Tazas, termos y mucho más.'].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex bg-foreground/80 rounded-lg p-4 justify-center items-center hover:bg-foreground transition-colors"
              >
                <p className="text-center font-medium text-background">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Podemos personalizar y diseñar tus ideas",
                content: "Solo comentanos la idea que tienes en mente y nosotros buscaremos la forma de diseñarlo, crearlo e imprimirlo en el artículo que desees."
              },
              {
                title: "Pago seguro y confiable",
                content: "Utilizamos la tecnología de Mercado pago para realizar los pagos en línea, garantizando la seguridad y facilidad para completar tu compra."
              },
              {
                title: "Tenemos Ofertas, Descuentos Y Cupones",
                content: "Ofrecemos el 10% de descuento en tu primer compra creando tu cuenta y envío gratis en compras mayores a $699.00"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="border border-foreground rounded-xl p-6 hover:border-indigo-300 transition-colors"
              >
                <div className="text-foreground font-bold text-2xl mb-2">0{index + 1}.</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Final */}
      <section className="py-16 bg-background2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Envíos a todo México",
                content: "Realizamos envío a través de paqueterías confiables para garantizar la seguridad de tu pedido."
              },
              {
                title: "La mejor calidad",
                content: "Danos una oportunidad y compruébalo"
              },
              {
                title: "Ofertas y descuentos",
                content: "¡Checa nuestras ofertas en nuestra página!"
              },
              {
                title: "Seguridad",
                content: "Mantenemos nuestro sitio en regla funcionando sólo con los mejores estándares."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-feature3 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}