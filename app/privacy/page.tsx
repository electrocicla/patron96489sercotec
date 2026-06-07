import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad"
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-civic-ink">Privacidad</h1>
      <div className="mt-6 space-y-5 text-base leading-7 text-civic-muted">
        <p>
          Esta plataforma solicita solo antecedentes necesarios para analizar patrones agregados. No se deben subir documentos con RUT, domicilios,
          telefonos, correos personales visibles, datos bancarios, firmas o informacion de terceros.
        </p>
        <p>
          La informacion publica se muestra anonimizada y agrupada. La evidencia cargada queda reservada para revision moderada y no debe contener
          datos personales innecesarios.
        </p>
        <p>
          Si una carga contiene datos privados visibles, puede ser rechazada, recortada o eliminada de los registros publicables.
        </p>
      </div>
    </section>
  );
}
