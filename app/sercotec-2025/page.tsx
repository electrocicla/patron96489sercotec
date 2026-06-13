import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { AlertTriangle, Download, FileText, SearchCheck } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resultados Sercotec 2025"
};

interface ProgramCard {
  name: string;
  internalProgram: string;
  rows: number;
  uniqueNames: number;
  maxAmount: string;
  maxAmountNumber: number;
  fundingType: string;
  duplicateAffected: number;
  duplicateExcess: number;
}

interface FundedDuplicateRow {
  rank: number;
  name: string;
  apparentType: string;
  programCount: number;
  programs: string;
  knownMax: string;
  knownMaxNumber: number;
}

interface FundedDuplicateProjectDetail {
  program: string;
  internalProgram: string;
  amount: string;
  amountNumber: number;
  awardedDate: string;
  actDate: string;
  actNumber: string;
  sourceCsv: string;
  financingType: string;
}

const directFundedPrograms: ProgramCard[] = [
  {
    "name": "Crece Sostenible",
    "internalProgram": "Crece Sostenible",
    "rows": 380,
    "uniqueNames": 380,
    "maxAmount": "$9.000.000",
    "maxAmountNumber": 9000000,
    "fundingType": "subsidio directo",
    "duplicateAffected": 0,
    "duplicateExcess": 0
  },
  {
    "name": "Crece",
    "internalProgram": "Crece",
    "rows": 1006,
    "uniqueNames": 1006,
    "maxAmount": "$5.000.000",
    "maxAmountNumber": 5000000,
    "fundingType": "subsidio directo",
    "duplicateAffected": 0,
    "duplicateExcess": 0
  },
  {
    "name": "Capital Pioneras",
    "internalProgram": "Capital Pioneras Emprende",
    "rows": 314,
    "uniqueNames": 314,
    "maxAmount": "$3.500.000",
    "maxAmountNumber": 3500000,
    "fundingType": "subsidio directo",
    "duplicateAffected": 0,
    "duplicateExcess": 0
  },
  {
    "name": "Capital Abeja",
    "internalProgram": "Capital Abeja Emprende",
    "rows": 933,
    "uniqueNames": 899,
    "maxAmount": "$3.500.000",
    "maxAmountNumber": 3500000,
    "fundingType": "subsidio directo",
    "duplicateAffected": 68,
    "duplicateExcess": 34
  },
  {
    "name": "Capital Semilla rotulado / Pioneras interno",
    "internalProgram": "Capital Pioneras Emprende",
    "rows": 546,
    "uniqueNames": 546,
    "maxAmount": "$3.500.000",
    "maxAmountNumber": 3500000,
    "fundingType": "subsidio directo",
    "duplicateAffected": 0,
    "duplicateExcess": 0
  },
  {
    "name": "Digitaliza tu Almacén",
    "internalProgram": "Digitaliza Tu Almacén",
    "rows": 410,
    "uniqueNames": 408,
    "maxAmount": "$3.000.000",
    "maxAmountNumber": 3000000,
    "fundingType": "subsidio directo",
    "duplicateAffected": 2,
    "duplicateExcess": 1
  },
  {
    "name": "Mejora Negocios",
    "internalProgram": "Mejora Negocios",
    "rows": 100,
    "uniqueNames": 99,
    "maxAmount": "$1.500.000",
    "maxAmountNumber": 1500000,
    "fundingType": "subsidio/cofinanciamiento de asesoría",
    "duplicateAffected": 2,
    "duplicateExcess": 1
  },
  {
    "name": "Negocios Digitales",
    "internalProgram": "Negocios Digitales",
    "rows": 78,
    "uniqueNames": 78,
    "maxAmount": "$1.500.000",
    "maxAmountNumber": 1500000,
    "fundingType": "apoyo monetario por componentes",
    "duplicateAffected": 0,
    "duplicateExcess": 0
  },
  {
    "name": "Ruta Digital Kit Digital",
    "internalProgram": "Formación Empresarial Ruta Digital",
    "rows": 690,
    "uniqueNames": 615,
    "maxAmount": "$1.200.000",
    "maxAmountNumber": 1200000,
    "fundingType": "subsidio directo",
    "duplicateAffected": 0,
    "duplicateExcess": 0
  }
];

const directFundedDuplicates: FundedDuplicateRow[] = [
  {
    "rank": 1,
    "name": "AIR WASH SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 3,
    "programs": "Crece Sostenible | Mejora Negocios | Ruta Digital Kit Digital",
    "knownMax": "$11.700.000",
    "knownMaxNumber": 11700000
  },
  {
    "rank": 2,
    "name": "SERVICIO Y TRANSPORTE MERCATUR LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 3,
    "programs": "Crece Sostenible | Mejora Negocios | Ruta Digital Kit Digital",
    "knownMax": "$11.700.000",
    "knownMaxNumber": 11700000
  },
  {
    "rank": 3,
    "name": "GRUPO CUNSA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 3,
    "programs": "Crece | Mejora Negocios | Negocios Digitales",
    "knownMax": "$8.000.000",
    "knownMaxNumber": 8000000
  },
  {
    "rank": 4,
    "name": "APICOLA RENE MARTINEZ CARTEZ EIRL",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 5,
    "name": "ARACENA Y CASTRO SERVICIOS AGROPECUARIOS Y URBANOS SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 6,
    "name": "CERVECERIA ÑUBLE LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Negocios Digitales",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 7,
    "name": "CHOCOLATERIA MAXIMILIANO CASTRO IBARRA EIRL",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Negocios Digitales",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 8,
    "name": "COMERCIALIZADORA DE PRODUCTOS MAGICSHINE LTDA.",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 9,
    "name": "CONSTRUCCIÓN ARTURO CESAR DELGADO ARAYA EIRL",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 10,
    "name": "CONSULTORA DEL VALLE SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 11,
    "name": "DISTRIBUIDORA Y VENTA DE AGUA ENVASADA Y ARTÍCULOS COMPLEMENTARIOS",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 12,
    "name": "ECO CHILE SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 13,
    "name": "ELABORADORA BOA VIDA DE MARÍA FRANCISCA MARDONES NARANJO EIRL",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Negocios Digitales",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 14,
    "name": "EMBALAJES INDUSTRIALES ARAYA LTDA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 15,
    "name": "JUAN CARLOS DÍAZ ARCE",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Negocios Digitales",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 16,
    "name": "PANEL SIP BIOBIO SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Negocios Digitales",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 17,
    "name": "PHYSALIS SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Negocios Digitales",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 18,
    "name": "PRINT SOLUTIONS SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Negocios Digitales",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 19,
    "name": "RENTAS E INVERSIONES SAN MARINO S.A.",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 20,
    "name": "SOCIEDAD DE INVERSIONES Y CONSTRUCCIÓN G Y TEC LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Mejora Negocios",
    "knownMax": "$10.500.000",
    "knownMaxNumber": 10500000
  },
  {
    "rank": 21,
    "name": "AGRICOLA DIEGO KAMINSKI PACHECO EIRL",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 22,
    "name": "FARMACIA CENTRO LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 23,
    "name": "HIDROPONIA ACONCAGUA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 24,
    "name": "IKIGAI GASTRONOMIA Y SERVICIOS SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 25,
    "name": "IMPORTADORA Y EXPORTADORA SUDAMERICANA LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 26,
    "name": "INNOVACION Y GESTION TECNOLOGICA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 27,
    "name": "IRON WORKS SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 28,
    "name": "ISLA DEL PUELO SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 29,
    "name": "KOONEX CHILE SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 30,
    "name": "KREARTE PATRIMONIAL SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 31,
    "name": "LEONEL ARMANDO BRAVO VALENZUELA",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 32,
    "name": "MAPU KIMUN SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 33,
    "name": "MIRIAM JUANA AGUILAR VILCA",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 34,
    "name": "ORIGINAL ROOTS SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 35,
    "name": "RICHARD EDUARDO HERNÁNDEZ PALAPE",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 36,
    "name": "SERVICIOS CASTILLO VALENZUELA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 37,
    "name": "SOCIEDAD LA CANTINA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 38,
    "name": "SOCIEDAD ZAZZALI Y VILLALOBOS LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece Sostenible | Ruta Digital Kit Digital",
    "knownMax": "$10.200.000",
    "knownMaxNumber": 10200000
  },
  {
    "rank": 39,
    "name": "INGENIERÍA SKYNAV SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Mejora Negocios",
    "knownMax": "$6.500.000",
    "knownMaxNumber": 6500000
  },
  {
    "rank": 40,
    "name": "MÁRQUEZ ARAYA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Mejora Negocios",
    "knownMax": "$6.500.000",
    "knownMaxNumber": 6500000
  },
  {
    "rank": 41,
    "name": "TURISMO RÍO NEGRO LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Negocios Digitales",
    "knownMax": "$6.500.000",
    "knownMaxNumber": 6500000
  },
  {
    "rank": 42,
    "name": "AGROINGENIA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 43,
    "name": "ALICIA DEL CARMEN OVANDO AGUILAR",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 44,
    "name": "AMUKAN COCINA GOURMET SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 45,
    "name": "COMERCIAL YESICA VARGAS VILLARROEL EIRL",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 46,
    "name": "COSMÉTICA NATURAL DENISSE VALERY SILVA SILVA E.I.R.L.",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 47,
    "name": "CROMA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 48,
    "name": "DISEÑO PUBLICIDAD E IMPRESIÓN DIGITAL SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 49,
    "name": "EMPRESA COMERCIAL MARIO DIAZ E.I.R.L.",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 50,
    "name": "GELATO HOUSE SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 51,
    "name": "HIDROFLEX VICTORIA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 52,
    "name": "JAVIER ENRIQUE SILVA ÁVILA",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 53,
    "name": "PAOLA VERÓNICA MIRANDA OYANEDEL",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 54,
    "name": "RESTAURANT EL BOSQUE LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 55,
    "name": "SARA DEL CARMEN GONZALEZ FIGUEROA",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 56,
    "name": "SOCIEDAD COMERCIAL KLENER Y MARCHANT LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 57,
    "name": "SOCIEDAD PUELCHE SERVICIOS INTEGRALES SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 58,
    "name": "TELAPINTO SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 59,
    "name": "TURISMO MARIA FRANCISCA ZUNIGA URZUA E.I.R.L",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 60,
    "name": "VENTA COMIDA RAPIDA GONZALO ARRAU E.I.R.L",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "knownMax": "$6.200.000",
    "knownMaxNumber": 6200000
  },
  {
    "rank": 61,
    "name": "BLANCA LILIANA RIOS ARIAS",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Digitaliza tu Almacén | Ruta Digital Kit Digital",
    "knownMax": "$4.200.000",
    "knownMaxNumber": 4200000
  },
  {
    "rank": 62,
    "name": "DENISSE SOLEDAD CANQUE CHOQUE",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Digitaliza tu Almacén | Ruta Digital Kit Digital",
    "knownMax": "$4.200.000",
    "knownMaxNumber": 4200000
  },
  {
    "rank": 63,
    "name": "EDITH VERÓNICA APAZ RAMÍREZ",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Digitaliza tu Almacén | Ruta Digital Kit Digital",
    "knownMax": "$4.200.000",
    "knownMaxNumber": 4200000
  },
  {
    "rank": 64,
    "name": "MARJOBA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Digitaliza tu Almacén | Ruta Digital Kit Digital",
    "knownMax": "$4.200.000",
    "knownMaxNumber": 4200000
  },
  {
    "rank": 65,
    "name": "EN BARRA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Mejora Negocios | Negocios Digitales",
    "knownMax": "$3.000.000",
    "knownMaxNumber": 3000000
  },
  {
    "rank": 66,
    "name": "KATALINA VICTORIA PESUTIC SOTOMAYOR",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Mejora Negocios | Negocios Digitales",
    "knownMax": "$3.000.000",
    "knownMaxNumber": 3000000
  },
  {
    "rank": 67,
    "name": "VEGAN PROBIOTIC SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Mejora Negocios | Negocios Digitales",
    "knownMax": "$3.000.000",
    "knownMaxNumber": 3000000
  },
  {
    "rank": 68,
    "name": "ALFONSINO SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Negocios Digitales | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  },
  {
    "rank": 69,
    "name": "JABONERÍA Y COSMÉTICA NATURAL FLOR DE LOTO SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Mejora Negocios | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  },
  {
    "rank": 70,
    "name": "KOHLMET METALÚRGICA LTDA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Mejora Negocios | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  },
  {
    "rank": 71,
    "name": "LA OTRA ROMI SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Negocios Digitales | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  },
  {
    "rank": 72,
    "name": "MAGALY CORTES VARAS",
    "apparentType": "persona natural o razon social sin forma societaria visible",
    "programCount": 2,
    "programs": "Negocios Digitales | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  },
  {
    "rank": 73,
    "name": "PROYECTOS TECNOLÓGICOS Y DOMÓTICA SPA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Negocios Digitales | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  },
  {
    "rank": 74,
    "name": "SOCIEDAD DE CAPACITACIÓN CREACAPACITA LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Mejora Negocios | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  },
  {
    "rank": 75,
    "name": "SUTRATO LIMITADA",
    "apparentType": "empresa/razon social con forma societaria visible",
    "programCount": 2,
    "programs": "Mejora Negocios | Ruta Digital Kit Digital",
    "knownMax": "$2.700.000",
    "knownMaxNumber": 2700000
  }
];

const summary = {
  "updated_at": "2026-06-12",
  "scope": "Fondos publicos concursables Sercotec 2025 con monto directo publicado o tope monetario conocido por programa.",
  "strict_direct_amount_programs": 9,
  "strict_direct_amount_rows": 4457,
  "duplicate_groups_direct_amount": 75,
  "duplicate_groups_in_two_programs": 72,
  "duplicate_groups_in_three_or_more_programs": 3,
  "duplicate_detail_rows_direct_amount": 161,
  "known_max_exposure_clp_sum_across_duplicate_groups": 578200000,
  "highest_known_max_exposure_clp": 11700000,
  "excluded_no_direct_amount_programs": [
    "Promoción y Canales",
    "Pymes Globales"
  ],
  "excluded_reason": "Se excluyen del ranking de multiples fondos directos los programas sin monto individual directo publicado en la fuente oficial o en la clasificacion del analisis."
} as const;

const directFundedDuplicateProjectDetails: Record<string, FundedDuplicateProjectDetail[]> = {
  "AIR WASH SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "24-10-2025",
      actDate: "24-10-2025",
      actNumber: "CER-D10-015363",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SERVICIO Y TRANSPORTE MERCATUR LIMITADA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "10-10-2025",
      actDate: "10-10-2025",
      actNumber: "CER-D03-015309",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D03-015170",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "GRUPO CUNSA SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "11-07-2025",
      actDate: "11-07-2025",
      actNumber: "CER-D03-015081",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "APICOLA RENE MARTINEZ CARTEZ EIRL": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "07-10-2025",
      actDate: "07-10-2025",
      actNumber: "CER-D07-015295",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "ARACENA Y CASTRO SERVICIOS AGROPECUARIOS Y URBANOS SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "14-10-2025",
      actDate: "14-10-2025",
      actNumber: "CER-D05-015322",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "CERVECERIA ÑUBLE LIMITADA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "16-10-2025",
      actDate: "16-10-2025",
      actNumber: "CER-D16-015328",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "CHOCOLATERIA MAXIMILIANO CASTRO IBARRA EIRL": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D06-015338",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "COMERCIALIZADORA DE PRODUCTOS MAGICSHINE LTDA.": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "15-10-2025",
      actDate: "15-10-2025",
      actNumber: "CER-D13-015331",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "CONSTRUCCIÓN ARTURO CESAR DELGADO ARAYA EIRL": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D01-015289",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "CONSULTORA DEL VALLE SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "15-10-2025",
      actDate: "15-10-2025",
      actNumber: "CER-D13-015331",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "DISTRIBUIDORA Y VENTA DE AGUA ENVASADA Y ARTÍCULOS COMPLEMENTARIOS": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "21-10-2025",
      actDate: "21-10-2025",
      actNumber: "CER-D15-015346",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "ECO CHILE SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D06-015338",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "ELABORADORA BOA VIDA DE MARÍA FRANCISCA MARDONES NARANJO EIRL": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "15-10-2025",
      actDate: "15-10-2025",
      actNumber: "CER-D13-015331",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "EMBALAJES INDUSTRIALES ARAYA LTDA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "15-10-2025",
      actDate: "15-10-2025",
      actNumber: "CER-D13-015331",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "JUAN CARLOS DÍAZ ARCE": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D06-015338",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "PANEL SIP BIOBIO SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "15-10-2025",
      actDate: "15-10-2025",
      actNumber: "CER-D08-015334",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "PHYSALIS SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "15-10-2025",
      actDate: "15-10-2025",
      actNumber: "CER-D13-015331",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "PRINT SOLUTIONS SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "14-10-2025",
      actDate: "14-10-2025",
      actNumber: "CER-D05-015322",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "RENTAS E INVERSIONES SAN MARINO S.A.": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "15-10-2025",
      actDate: "15-10-2025",
      actNumber: "CER-D13-015331",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "SOCIEDAD DE INVERSIONES Y CONSTRUCCIÓN G Y TEC LIMITADA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D06-015338",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "AGRICOLA DIEGO KAMINSKI PACHECO EIRL": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "24-10-2025",
      actDate: "24-10-2025",
      actNumber: "CER-D10-015363",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "FARMACIA CENTRO LIMITADA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D14-015315",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D14-015186",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-11-2025",
      actDate: "27-11-2025",
      actNumber: "CER-D14-015430",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "HIDROPONIA ACONCAGUA SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "14-10-2025",
      actDate: "14-10-2025",
      actNumber: "CER-D05-015322",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "12-09-2025",
      actDate: "12-09-2025",
      actNumber: "CER-D05-015237",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "IKIGAI GASTRONOMIA Y SERVICIOS SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "16-10-2025",
      actDate: "16-10-2025",
      actNumber: "CER-D16-015328",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "21-08-2025",
      actDate: "21-08-2025",
      actNumber: "CER-D16-015157",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "IMPORTADORA Y EXPORTADORA SUDAMERICANA LIMITADA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D01-015289",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "01-10-2025",
      actDate: "01-10-2025",
      actNumber: "CER-D01-015273",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "INNOVACION Y GESTION TECNOLOGICA SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D01-015289",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "01-10-2025",
      actDate: "01-10-2025",
      actNumber: "CER-D01-015273",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "IRON WORKS SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "10-10-2025",
      actDate: "10-10-2025",
      actNumber: "CER-D04-015308",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "08-09-2025",
      actDate: "08-09-2025",
      actNumber: "CER-D04-015221",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "ISLA DEL PUELO SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "24-10-2025",
      actDate: "24-10-2025",
      actNumber: "CER-D10-015363",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "KOONEX CHILE SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "25-11-2025",
      actDate: "25-11-2025",
      actNumber: "CER-D12-015396",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "09-09-2025",
      actDate: "09-09-2025",
      actNumber: "CER-D12-015222",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "KREARTE PATRIMONIAL SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D14-015315",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D14-015186",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-11-2025",
      actDate: "27-11-2025",
      actNumber: "CER-D14-015430",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "LEONEL ARMANDO BRAVO VALENZUELA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "07-10-2025",
      actDate: "07-10-2025",
      actNumber: "CER-D07-015295",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D07-015166",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "MAPU KIMUN SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "20-10-2025",
      actDate: "20-10-2025",
      actNumber: "CER-D14-015315",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D14-015186",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-11-2025",
      actDate: "27-11-2025",
      actNumber: "CER-D14-015430",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "MIRIAM JUANA AGUILAR VILCA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "29-10-2025",
      actDate: "29-10-2025",
      actNumber: "CER-D02-015370",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D02-015193",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "29-08-2025",
      actDate: "29-08-2025",
      actNumber: "CER-D02-015201",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "ORIGINAL ROOTS SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "10-10-2025",
      actDate: "10-10-2025",
      actNumber: "CER-D03-015309",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D03-015170",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "RICHARD EDUARDO HERNÁNDEZ PALAPE": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "21-10-2025",
      actDate: "21-10-2025",
      actNumber: "CER-D15-015346",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "29-08-2025",
      actDate: "29-08-2025",
      actNumber: "CER-D15-015182",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SERVICIOS CASTILLO VALENZUELA SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "29-10-2025",
      actDate: "29-10-2025",
      actNumber: "CER-D02-015370",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D02-015193",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "29-08-2025",
      actDate: "29-08-2025",
      actNumber: "CER-D02-015201",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SOCIEDAD LA CANTINA SPA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "07-11-2025",
      actDate: "07-11-2025",
      actNumber: "CER-D09-015401",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015195",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SOCIEDAD ZAZZALI Y VILLALOBOS LIMITADA": [
    {
      program: "Crece Sostenible",
      internalProgram: "Crece Sostenible",
      amount: "$9.000.000",
      amountNumber: 9000000,
      awardedDate: "10-10-2025",
      actDate: "10-10-2025",
      actNumber: "CER-D03-015309",
      sourceCsv: "Crece Sostenible 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D03-015170",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "INGENIERÍA SKYNAV SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "25-08-2025",
      actDate: "25-08-2025",
      actNumber: "CER-D06-015179",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "MÁRQUEZ ARAYA SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "18-08-2025",
      actDate: "18-08-2025",
      actNumber: "CER-D13-015156",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
  ],
  "TURISMO RÍO NEGRO LIMITADA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "26-08-2025",
      actDate: "26-08-2025",
      actNumber: "CER-D10-015185",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "AGROINGENIA SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "26-08-2025",
      actDate: "26-08-2025",
      actNumber: "CER-D10-015185",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "ALICIA DEL CARMEN OVANDO AGUILAR": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "26-08-2025",
      actDate: "26-08-2025",
      actNumber: "CER-D10-015185",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "AMUKAN COCINA GOURMET SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "26-08-2025",
      actDate: "26-08-2025",
      actNumber: "CER-D10-015185",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "COMERCIAL YESICA VARGAS VILLARROEL EIRL": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D14-015186",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D14-015186",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-11-2025",
      actDate: "27-11-2025",
      actNumber: "CER-D14-015430",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "COSMÉTICA NATURAL DENISSE VALERY SILVA SILVA E.I.R.L.": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "14-10-2025",
      actDate: "14-10-2025",
      actNumber: "CER-D15-015291",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "29-08-2025",
      actDate: "29-08-2025",
      actNumber: "CER-D15-015182",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "CROMA SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015196",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015195",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "DISEÑO PUBLICIDAD E IMPRESIÓN DIGITAL SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "26-08-2025",
      actDate: "26-08-2025",
      actNumber: "CER-D10-015185",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "EMPRESA COMERCIAL MARIO DIAZ E.I.R.L.": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015196",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015195",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "GELATO HOUSE SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "18-08-2025",
      actDate: "18-08-2025",
      actNumber: "CER-D13-015156",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "12-09-2025",
      actDate: "12-09-2025",
      actNumber: "CER-D13-015239",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "HIDROFLEX VICTORIA SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015196",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015195",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "JAVIER ENRIQUE SILVA ÁVILA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D14-015186",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D14-015186",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-11-2025",
      actDate: "27-11-2025",
      actNumber: "CER-D14-015430",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "PAOLA VERÓNICA MIRANDA OYANEDEL": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "18-08-2025",
      actDate: "18-08-2025",
      actNumber: "CER-D04-015153",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "08-09-2025",
      actDate: "08-09-2025",
      actNumber: "CER-D04-015221",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "RESTAURANT EL BOSQUE LIMITADA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "18-08-2025",
      actDate: "18-08-2025",
      actNumber: "CER-D04-015153",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "08-09-2025",
      actDate: "08-09-2025",
      actNumber: "CER-D04-015221",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SARA DEL CARMEN GONZALEZ FIGUEROA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015196",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "27-08-2025",
      actDate: "27-08-2025",
      actNumber: "CER-D09-015195",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SOCIEDAD COMERCIAL KLENER Y MARCHANT LIMITADA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "11-07-2025",
      actDate: "11-07-2025",
      actNumber: "CER-D03-015081",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D03-015170",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SOCIEDAD PUELCHE SERVICIOS INTEGRALES SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "01-08-2025",
      actDate: "01-08-2025",
      actNumber: "CER-D16-015122",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "21-08-2025",
      actDate: "21-08-2025",
      actNumber: "CER-D16-015157",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "TELAPINTO SPA": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "26-08-2025",
      actDate: "26-08-2025",
      actNumber: "CER-D10-015185",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "20-08-2025",
      actDate: "20-08-2025",
      actNumber: "CER-D10-015172",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "TURISMO MARIA FRANCISCA ZUNIGA URZUA E.I.R.L": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "22-09-2025",
      actDate: "22-09-2025",
      actNumber: "CER-D11-015230",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "22-09-2025",
      actDate: "22-09-2025",
      actNumber: "CER-D11-015250",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "VENTA COMIDA RAPIDA GONZALO ARRAU E.I.R.L": [
    {
      program: "Crece",
      internalProgram: "Crece",
      amount: "$5.000.000",
      amountNumber: 5000000,
      awardedDate: "05-09-2025",
      actDate: "05-09-2025",
      actNumber: "CER-D08-015214",
      sourceCsv: "Crece; Fondo de desarrollo de negocios.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "25-08-2025",
      actDate: "25-08-2025",
      actNumber: "CER-D08-015173",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "BLANCA LILIANA RIOS ARIAS": [
    {
      program: "Digitaliza tu Almacén",
      internalProgram: "Digitaliza Tu Almacén",
      amount: "$3.000.000",
      amountNumber: 3000000,
      awardedDate: "22-05-2025",
      actDate: "22-05-2025",
      actNumber: "CER-D12-014910",
      sourceCsv: "Digitaliza tu almacén 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "09-09-2025",
      actDate: "09-09-2025",
      actNumber: "CER-D12-015222",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "DENISSE SOLEDAD CANQUE CHOQUE": [
    {
      program: "Digitaliza tu Almacén",
      internalProgram: "Digitaliza Tu Almacén",
      amount: "$3.000.000",
      amountNumber: 3000000,
      awardedDate: "01-07-2025",
      actDate: "01-07-2025",
      actNumber: "CER-D15-015042",
      sourceCsv: "Digitaliza tu almacén 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "29-08-2025",
      actDate: "29-08-2025",
      actNumber: "CER-D15-015182",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "EDITH VERÓNICA APAZ RAMÍREZ": [
    {
      program: "Digitaliza tu Almacén",
      internalProgram: "Digitaliza Tu Almacén",
      amount: "$3.000.000",
      amountNumber: 3000000,
      awardedDate: "01-07-2025",
      actDate: "01-07-2025",
      actNumber: "CER-D15-015042",
      sourceCsv: "Digitaliza tu almacén 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "29-08-2025",
      actDate: "29-08-2025",
      actNumber: "CER-D15-015182",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "MARJOBA SPA": [
    {
      program: "Digitaliza tu Almacén",
      internalProgram: "Digitaliza Tu Almacén",
      amount: "$3.000.000",
      amountNumber: 3000000,
      awardedDate: "29-05-2025",
      actDate: "29-05-2025",
      actNumber: "CER-D03-014972",
      sourceCsv: "Digitaliza tu almacén 2025.csv",
      financingType: "subsidio directo",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D03-015170",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "EN BARRA SPA": [
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "KATALINA VICTORIA PESUTIC SOTOMAYOR": [
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "VEGAN PROBIOTIC SPA": [
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
  ],
  "ALFONSINO SPA": [
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "12-09-2025",
      actDate: "12-09-2025",
      actNumber: "CER-D13-015239",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "JABONERÍA Y COSMÉTICA NATURAL FLOR DE LOTO SPA": [
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D07-015166",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "KOHLMET METALÚRGICA LTDA": [
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "12-09-2025",
      actDate: "12-09-2025",
      actNumber: "CER-D13-015239",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "LA OTRA ROMI SPA": [
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "12-09-2025",
      actDate: "12-09-2025",
      actNumber: "CER-D05-015237",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "MAGALY CORTES VARAS": [
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "08-09-2025",
      actDate: "08-09-2025",
      actNumber: "CER-D04-015221",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "PROYECTOS TECNOLÓGICOS Y DOMÓTICA SPA": [
    {
      program: "Negocios Digitales",
      internalProgram: "Negocios Digitales",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "014-2025",
      sourceCsv: "Negocios Digitales 2025.csv",
      financingType: "apoyo monetario por componentes",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "11-09-2025",
      actDate: "11-09-2025",
      actNumber: "CER-D06-015234",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SOCIEDAD DE CAPACITACIÓN CREACAPACITA LIMITADA": [
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "19-08-2025",
      actDate: "19-08-2025",
      actNumber: "CER-D07-015166",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
  "SUTRATO LIMITADA": [
    {
      program: "Mejora Negocios",
      internalProgram: "Mejora Negocios",
      amount: "$1.500.000",
      amountNumber: 1500000,
      awardedDate: "08-10-2025",
      actDate: "08-10-2025",
      actNumber: "CER-D801-015299",
      sourceCsv: "Mejora Negocios 2025.csv",
      financingType: "subsidio/cofinanciamiento de asesoría",
    },
    {
      program: "Ruta Digital Kit Digital",
      internalProgram: "Formación Empresarial Ruta Digital",
      amount: "$1.200.000",
      amountNumber: 1200000,
      awardedDate: "29-08-2025",
      actDate: "29-08-2025",
      actNumber: "CER-D15-015182",
      sourceCsv: "Ruta Digital 2025.csv",
      financingType: "subsidio directo",
    },
  ],
};

const excludedPrograms = ["Promoción y Canales", "Pymes Globales"];

function formatNumber(value: number): string {
  return value.toLocaleString("es-CL");
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-civic-line bg-white p-3">
      <dt className="text-xs font-medium uppercase tracking-[0.08em] text-civic-muted">{label}</dt>
      <dd className="mt-1 text-lg font-bold text-civic-ink">{typeof value === "number" ? formatNumber(value) : value}</dd>
    </div>
  );
}

function DataLink({ href, children }: { href: string; children: string }) {
  return (
    <Link className="inline-flex items-center gap-2 rounded-md border border-civic-line px-3 py-2 text-sm font-medium text-civic-blue hover:bg-civic-panel" href={href}>
      <Download aria-hidden="true" size={15} />
      {children}
    </Link>
  );
}

function SimpleTable({ rows }: { rows: FundedDuplicateRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-civic-line text-civic-muted">
            <th className="py-3 pr-4 font-semibold">#</th>
            <th className="py-3 pr-4 font-semibold">Razón social / persona</th>
            <th className="py-3 pr-4 font-semibold">Programas</th>
            <th className="py-3 pr-4 font-semibold">Cantidad</th>
            <th className="py-3 pr-4 font-semibold">Total conocido</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const details = directFundedDuplicateProjectDetails[row.name] ?? [];

            return (
              <Fragment key={row.rank}>
                <tr className="border-b border-civic-line">
                  <td className="py-3 pr-4 font-semibold text-civic-muted">{row.rank}</td>
                  <td className="py-3 pr-4 text-civic-ink">
                    <span className="font-semibold">{row.name}</span>
                    <span className="mt-1 block text-xs text-civic-muted">{row.apparentType}</span>
                  </td>
                  <td className="py-3 pr-4 text-civic-muted">{row.programs}</td>
                  <td className="py-3 pr-4 font-semibold text-civic-ink">{row.programCount}</td>
                  <td className="py-3 pr-4 font-semibold text-civic-blue">{row.knownMax}</td>
                </tr>
                <tr className="border-b border-civic-line last:border-0 bg-civic-panel/30">
                  <td className="pb-4 pl-0 pr-4 pt-0" colSpan={5}>
                    <div className="ml-6 mt-3 rounded-md border border-civic-line bg-white p-3">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-civic-muted">Detalle por programa y fecha</p>
                      <table className="w-full min-w-[960px] border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-civic-line text-civic-muted">
                            <th className="py-2 pr-3 font-semibold">Programa</th>
                            <th className="py-2 pr-3 font-semibold">Monto</th>
                            <th className="py-2 pr-3 font-semibold">Otorgamiento</th>
                            <th className="py-2 pr-3 font-semibold">Fecha acto</th>
                            <th className="py-2 pr-3 font-semibold">Acto</th>
                            <th className="py-2 pr-3 font-semibold">CSV</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.map((detail, index) => (
                            <tr className="border-b border-civic-line last:border-0" key={`${row.rank}-${detail.program}-${detail.actNumber}-${index}`}>
                              <td className="py-2 pr-3 text-civic-ink">
                                <span className="font-semibold">{detail.program}</span>
                                <span className="mt-1 block text-[11px] text-civic-muted">{detail.financingType}</span>
                              </td>
                              <td className="py-2 pr-3 font-semibold text-civic-blue">{detail.amount}</td>
                              <td className="py-2 pr-3 text-civic-muted">{detail.awardedDate}</td>
                              <td className="py-2 pr-3 text-civic-muted">{detail.actDate}</td>
                              <td className="py-2 pr-3 text-civic-muted">{detail.actNumber || "Sin dato"}</td>
                              <td className="py-2 pr-3 text-civic-muted">{detail.sourceCsv}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Sercotec2025Page() {
  const threeOrMoreRows = directFundedDuplicates.filter((row) => row.programCount >= 3);
  const directFundedRows = directFundedPrograms.reduce((sum, program) => sum + program.rows, 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Auditoría de fondos públicos concursables</p>
        <h1 className="mt-3 text-3xl font-bold text-civic-ink sm:text-4xl">Resultados Sercotec 2025</h1>
        <p className="mt-4 text-sm leading-6 text-civic-muted">
          Revisión pública de los CSV de Transparencia Activa 2025, filtrada sólo a programas con subsidio directo, cofinanciamiento o tope monetario explícito. Se excluyen del ranking de múltiples fondos los programas sin monto individual directo publicado.
        </p>
      </div>

      <dl className="grid gap-4 md:grid-cols-4">
        <Metric label="Programas con monto" value={summary.strict_direct_amount_programs} />
        <Metric label="Registros con monto" value={directFundedRows} />
        <Metric label="Repetidos en 2+ fondos" value={summary.duplicate_groups_direct_amount} />
        <Metric label="Repetidos en 3+ fondos" value={summary.duplicate_groups_in_three_or_more_programs} />
      </dl>

      <Card className="mt-8 border-civic-red">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle aria-hidden="true" className="text-civic-red" size={20} />
            <h2 className="text-xl font-bold text-civic-ink">Empresas y personas repetidas en fondos con monto directo</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-3 text-sm leading-6 text-civic-muted">
            <p>
              Se detectaron {summary.duplicate_groups_direct_amount} razones sociales normalizadas repetidas en dos o más programas con monto directo conocido. De ellas, {summary.duplicate_groups_in_three_or_more_programs} aparecen en tres programas monetarios y {summary.duplicate_groups_in_two_programs} aparecen en dos programas monetarios.
            </p>
            <p>
              El mayor tope acumulado observado por razón social alcanza {summary.highest_known_max_exposure_clp.toLocaleString("es-CL")} CLP. La suma de topes conocidos de todos los grupos repetidos asciende a {summary.known_max_exposure_clp_sum_across_duplicate_groups.toLocaleString("es-CL")} CLP.
            </p>
            <p>
              Promoción y Canales y Pymes Globales quedan fuera de este ranking porque no entregan un monto directo individual publicado en la clasificación utilizada para este cruce.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <DataLink href="/data/sercotec2025/funded/direct-funded-duplicates.csv">Duplicados con monto directo</DataLink>
            <DataLink href="/data/sercotec2025/funded/direct-funded-duplicate-detail-rows.csv">Detalle por fila</DataLink>
            <DataLink href="/data/sercotec2025/funded/direct-funded-duplicate-project-breakdown.csv">Desglose público por programa</DataLink>
            <DataLink href="/data/sercotec2025/funded/direct-funded-three-or-more-programs.csv">Tres o más fondos</DataLink>
            <DataLink href="/data/sercotec2025/funded/direct-funded-programs.csv">Clasificación de fondos</DataLink>
            <DataLink href="/data/sercotec2025/funded/excluded-no-direct-amount-programs.csv">Excluidos sin monto directo</DataLink>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <SearchCheck aria-hidden="true" className="text-civic-red" size={20} />
            <h2 className="text-xl font-bold text-civic-ink">Casos en tres programas con fondos directos</h2>
          </div>
        </CardHeader>
        <CardBody>
          <p className="mb-4 text-sm leading-6 text-civic-muted">Cada caso expone monto por programa, fecha de otorgamiento, fecha del acto administrativo, número de acto y archivo CSV de origen.</p>
          <SimpleTable rows={threeOrMoreRows} />
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Todos los casos en dos o más fondos directos</h2>
        </CardHeader>
        <CardBody>
          <p className="mb-4 text-sm leading-6 text-civic-muted">La columna Total conocido suma los montos o topes monetarios publicados para los programas directos asociados a cada razón social.</p>
          <SimpleTable rows={directFundedDuplicates} />
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText aria-hidden="true" className="text-civic-blue" size={20} />
            <h2 className="text-xl font-bold text-civic-ink">Programas considerados con monto directo</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {directFundedPrograms.map((program) => (
              <div className="rounded-md border border-civic-line bg-white p-4" key={program.name}>
                <h3 className="font-bold text-civic-ink">{program.name}</h3>
                <p className="mt-1 text-xs leading-5 text-civic-muted">Programa interno CSV: {program.internalProgram}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <Metric label="Registros" value={program.rows} />
                  <Metric label="Tope" value={program.maxAmount} />
                </dl>
                <p className="mt-3 text-xs leading-5 text-civic-muted">{program.fundingType}</p>
                {program.duplicateAffected > 0 ? (
                  <p className="mt-2 text-xs font-semibold text-civic-red">{program.duplicateAffected} filas afectadas por duplicación exacta.</p>
                ) : null}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Datos excluidos del ranking monetario directo</h2>
        </CardHeader>
        <CardBody>
          <p className="text-sm leading-6 text-civic-muted">
            {excludedPrograms.join(" y ")} no se usan para sumar exposición monetaria directa porque no tienen monto individual directo publicado en la clasificación pública de este análisis. Sus CSV originales permanecen disponibles en la sección general de evidencia.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <DataLink href="/data/sercotec2025/originals/promocion-canales-comercializacion-2025.csv">CSV Promoción y Canales</DataLink>
            <DataLink href="/data/sercotec2025/originals/pymes-globales-2025.csv">CSV Pymes Globales</DataLink>
            <DataLink href="/data/sercotec2025/analysis/cross-program-repeated-beneficiaries.csv">Cruce general sin filtro</DataLink>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Evidencia descargable</h2>
        </CardHeader>
        <CardBody>
          <p className="text-sm leading-6 text-civic-muted">
            Se mantienen disponibles los CSV originales, el índice normalizado, los archivos de duplicados, las marcas por programa y el informe documental de auditoría.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <DataLink href="/reports/sercotec2025/informe-auditoria-sercotec-2025.pdf">Informe PDF</DataLink>
            <DataLink href="/reports/sercotec2025/informe-auditoria-sercotec-2025.docx">Informe DOCX</DataLink>
            <DataLink href="/data/sercotec2025/analysis/anomalies.csv">Matriz de anomalías</DataLink>
            <DataLink href="/data/sercotec2025/analysis/normalized-row-index.csv">Índice normalizado</DataLink>
            <DataLink href="/data/sercotec2025/manifest.json">Manifiesto JSON</DataLink>
            <DataLink href="/data/sercotec2025/funded/direct-funded-summary.json">Resumen fondos directos JSON</DataLink>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
