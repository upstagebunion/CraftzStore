import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Aviso de privacidad"
}

export default function PrivacyPolicy() {
  return (
    <>
      <div className="bg-background2 px-4 py-8"> {/* Replaces .ast-container */}
          <article className="bg-background px-10 py-6 rounded-lg shadow-md m-auto max-w-4xl"> {/* Article container with styling */}
              <h1 className="text-4xl font-extrabold text-foreground my-4">
                Aviso de Privacidad
              </h1>
              <div className="prose prose-lg max-w-none"> {/* Tailwind's @tailwindcss/typography plugin for better default styling */}
                  <h2 className="text-2xl font-bold text-foreground/90 mb-4">Aviso de Privacidad Integral</h2>

                  <p className="text-lg font-semibold mb-2 mt-6">¿Para qué fines utilizaremos sus datos personales?</p>
                  <p className="mb-4">Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p>
                  <p className="mb-4">Respuesta a mensajes del formulario de contacto, Envío de productos adquiridos en esta tienda en línea</p>

                  <p className="text-lg font-semibold mb-2 mt-6">¿Qué datos personales utilizaremos para estos fines?</p>
                  <p className="mb-4">Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:</p>
                  <p className="mb-4">Datos de identificación y contacto</p>

                  <p className="text-lg font-semibold mb-2 mt-6">¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso o ejercer la revocación de consentimiento?</p>
                  <p className="mb-4">Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.</p>
                  <p className="mb-4">
                    Para el ejercicio de cualquiera de los derechos ARCO, debe enviar una petición vía correo electrónico a: <a href="mailto:contacto@craftzstore.com" className="hover:underline">contacto@craftzstore.com</a> y deberá contener:
                  </p>

                  <ul className="list-disc list-inside space-y-1 ml-5 mb-4">
                      <li>Nombre completo del titular.</li>
                      <li>Domicilio.</li>
                      <li>Teléfono.</li>
                      <li>Correo electrónico usado en este sitio web.</li>
                      <li>Copia de una identificación oficial adjunta.</li>
                      <li>Asunto “Derechos ARCO”</li>
                  </ul>

                  <p className="mb-4">Descripción el objeto del escrito, los cuales pueden ser de manera enunciativa más no limitativa los siguientes: Revocación del consentimiento para tratar sus datos personales; y/o Notificación del uso indebido del tratamiento de sus datos personales; y/o Ejercitar sus Derechos ARCO, con una descripción clara y precisa de los datos a Acceder, Rectificar, Cancelar o bien, Oponerse. En caso de Rectificación de datos personales, deberá indicar la modificación exacta y anexar la documentación soporte; es importante en caso de revocación del consentimiento, que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir tratando sus datos personales. Asimismo, usted deberá considerar que para ciertos fines, la revocación de su consentimiento implicará que no le podamos seguir prestando el servicio que nos solicitó, o la conclusión de su relación con nosotros.</p>

                  <p className="text-lg font-semibold mb-2 mt-6">¿En cuántos días le daremos respuesta a su solicitud?</p>
                  <p className="mb-4">5 días</p>

                  <p className="text-lg font-semibold mb-2 mt-6">¿Por qué medio le comunicaremos la respuesta a su solicitud?</p>
                  <p className="mb-4">Al mismo correo electrónico de donde se envío la petición.</p>

                  <p className="text-lg font-semibold mb-2 mt-6">El uso de tecnologías de rastreo en nuestro portal de internet</p>
                  <p className="mb-4">Le informamos que en nuestra página de internet utilizamos cookies, web beacons u otras tecnologías, a través de las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia al navegar en nuestra página. Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:</p>
                  <p className="mb-4">Identificadores, nombre de usuario y contraseñas de sesión, Idioma preferido por el usuario, Región en la que se encuentra el usuario, Fecha y hora del inicio y final de una sesión de un usuario, Búsquedas realizadas por un usuario, Publicidad revisada por un usuario, Listas y hábitos de consumo en páginas de compras</p>
                  <p className="mb-4">Estas cookies, web beacons y otras tecnologías pueden ser deshabilitadas. Para conocer cómo hacerlo, consulte el menú de ayuda de su navegador. Tenga en cuenta que, en caso de desactivar las cookies, es posible que no pueda acceder a ciertas funciones personalizadas en nuestros sitio web.</p>

                  <p className="text-lg font-semibold mb-2 mt-6">¿Cómo puede conocer los cambios en este aviso de privacidad?</p>
                  <p className="mb-4">El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas. Nos comprometemos a mantener actualizado este aviso de privacidad sobre los cambios que pueda sufrir y siempre podrá consultar las actualizaciones que existan en el sitio web <a href="https://www.craftzstore.com" target="_blank" rel="noreferrer noopener" className="hover:underline">www.craftzstore.com</a>.</p>

                  <p id="aviso-format" className="text-sm text-foreground/50 mt-8">Última actualización de este&nbsp;<a href="https://markethax.com/generador-aviso-de-privacidad/" target="_blank" rel="noreferrer noopener" className="hover:underline">aviso de privacidad</a>: 17/05/2024</p>
              </div>
          </article>
      </div>
    </>
  );
}
