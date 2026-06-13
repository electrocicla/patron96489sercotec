# Evidencia Resultados

Plataforma independiente para recopilar, ordenar y revisar evidencia documentada sobre resultados de postulaciones, comunicaciones y antecedentes asociados a procesos Sercotec. El objetivo del MVP es entregar un flujo sobrio para registrar casos, adjuntar respaldo y consultar estadisticas agregadas sin exponer datos sensibles de forma innecesaria.

El proyecto debe evitar lenguaje difamatorio o acusatorio. La plataforma trabaja con antecedentes, trazabilidad y evidencia aportada por usuarios; no declara responsabilidades legales ni reemplaza asesoria juridica.

## Stack

- Next.js 16 con React 19 para el frontend.
- Exportacion estatica de Next mediante `output: "export"`.
- Tailwind CSS para estilos.
- TypeScript estricto para contratos de datos.
- Hono para la API del Worker.
- Cloudflare Pages para servir el frontend estatico.
- Cloudflare Workers para la API separada.
- Cloudflare D1 para datos estructurados.
- Cloudflare R2 para archivos de evidencia.
- Cloudflare Turnstile para mitigacion de abuso en formularios publicos.
- Wrangler para desarrollo, migraciones, secretos y despliegue.

Cloudflare recomienda Workers/OpenNext cuando una aplicacion Next.js necesita SSR, rutas dinamicas de servidor o funcionalidades runtime de Next en el edge. Este MVP usa Next static export en Cloudflare Pages y un Hono Worker separado porque las paginas son estaticas y consumen una API externa.

Produccion:

- Frontend canonico: `https://sercotecpatron96489.pages.dev`
- Worker API: `https://evidenciaresultados-api.electrocicla.workers.dev`

La configuracion del Worker vive en `wrangler.toml`; la configuracion de Pages vive en `wrangler.pages.toml`.

## Arquitectura

La separacion prevista es:

- Frontend estatico: renderiza paginas, formularios y vistas publicas. No accede directamente a D1 ni R2.
- Worker API Hono: valida solicitudes, aplica reglas de negocio, interactua con D1/R2 y devuelve respuestas JSON.
- D1: persiste casos, estados, auditoria minima, metadatos de evidencia y agregados.
- R2: almacena archivos adjuntos, preferentemente con nombres no identificables y metadatos controlados.
- Turnstile: protege endpoints de envio publico antes de crear registros o aceptar adjuntos.
- Admin: interfaz o endpoints restringidos para revision, moderacion, cambio de estado y exportacion operativa.

Los limites entre capas deben mantenerse claros: la UI no decide reglas legales u operativas, la API no mezcla presentacion, y la persistencia no contiene comportamiento de negocio.

## SOLID y SRP

El codigo debe mantener responsabilidades pequenas y verificables:

- Single Responsibility Principle: cada modulo debe tener una razon principal para cambiar.
- Separar validacion de entrada, reglas de negocio, acceso a datos, almacenamiento de archivos y presentacion.
- Evitar acoplar componentes React a detalles de D1, R2 o Wrangler.
- Evitar que handlers Hono acumulen validacion, autorizacion, persistencia y transformaciones complejas en un solo bloque.
- Preferir contratos tipados reutilizables para requests, responses y entidades.
- No introducir `any` ni `as any`; si un tipo falta, definirlo de forma explicita.

## Instalacion

Requisitos:

- Node.js compatible con Next 16.
- pnpm 10.x.
- Cuenta Cloudflare con Pages, Workers, D1, R2 y Turnstile habilitados.
- Wrangler autenticado con la cuenta correcta.

Instalar dependencias:

```powershell
pnpm install
```

Validar el proyecto local:

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

## Desarrollo Local

Frontend Next:

```powershell
pnpm dev
```

Worker API:

```powershell
pnpm worker:dev
```

Si se requiere ejecutar Wrangler directamente:

```powershell
wrangler dev
```

Migraciones D1 locales:

```powershell
pnpm db:migrate:local
```

Migraciones D1 remotas:

```powershell
pnpm db:migrate:remote
```

## Cloudflare Pages

El frontend se despliega como sitio estatico. Configuracion recomendada para Pages:

- Build command: `pnpm build`
- Output directory: `out`
- Package manager: `pnpm`
- Variables publicas: usar solo valores no sensibles, por ejemplo URL publica de la API y site key de Turnstile.

No poner secretos en variables expuestas al navegador. Cualquier token privado, clave R2 o secreto de Turnstile debe vivir en el Worker.

Variables publicas usadas por el frontend:

```powershell
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADgCOMftALHtYaaE
NEXT_PUBLIC_API_BASE_URL=
```

`NEXT_PUBLIC_API_BASE_URL` puede quedar vacia cuando Pages enruta `/api/*` al Worker en el mismo dominio. Si la API vive en otro subdominio, usar la URL base del Worker sin slash final.

## Worker API Hono

La API debe concentrar:

- Validacion de payloads.
- Verificacion de Turnstile.
- Escritura y lectura de D1.
- Emision de URLs firmadas o flujos controlados para R2 si aplica.
- Politicas de rate limit, autorizacion admin y auditoria.
- Deteccion dinamica de puntajes repetidos desde dos reportes, sin limitarse al valor `96.489`.
- Generacion de un borrador formal basado en agregados actuales, sin afirmar irregularidades no verificadas.

Comandos relevantes:

```powershell
pnpm worker:dev
pnpm deploy
pnpm wrangler deploy
```

## D1

Crear base D1:

```powershell
pnpm wrangler d1 create evidencia_resultados
```

Aplicar migraciones:

```powershell
pnpm wrangler d1 migrations apply evidencia_resultados --local
pnpm wrangler d1 migrations apply evidencia_resultados --remote
```

Buenas practicas:

- Mantener migraciones versionadas.
- No guardar archivos binarios en D1.
- Minimizar datos personales.
- Registrar estados y fechas de revision para trazabilidad.
- Evitar eliminar evidencia operativa sin politica de retencion definida.

## R2

Crear bucket:

```powershell
pnpm wrangler r2 bucket create evidencia-resultados
```

Buenas practicas:

- Guardar archivos con identificadores opacos.
- Validar tipo, tamano y extension antes de aceptar cargas.
- Separar metadatos en D1 y contenido binario en R2.
- No hacer publico el bucket salvo que exista una decision explicita y documentada.
- Usar URLs firmadas o endpoints del Worker para acceso controlado.

## Turnstile

Turnstile debe proteger formularios publicos de envio y cualquier endpoint con riesgo de abuso. El frontend usa la site key publica; el Worker valida el token con el secreto privado.

Secretos esperados:

```powershell
pnpm wrangler secret put TURNSTILE_SECRET_KEY
```

Para desarrollo local con `pnpm worker:dev`, crear `.dev.vars` a partir de `.dev.vars.example`. No commitear `.dev.vars`.

## Secretos y Variables

Configurar secretos del Worker con Wrangler:

```powershell
pnpm wrangler secret put ADMIN_TOKEN
pnpm wrangler secret put TURNSTILE_SECRET_KEY
pnpm wrangler secret put FILE_SIGNING_SECRET
```

Segun la configuracion final, tambien pueden requerirse secretos o bindings para R2, D1 y variables de entorno de API. No subir archivos `.env` con credenciales.

## Admin

El area admin debe existir solo para personas autorizadas y cubrir como minimo:

- Revision de casos enviados.
- Cambio de estado: `pending`, `verified_pattern`, `rejected_private_data`, `duplicate` o `published`.
- Visualizacion controlada de adjuntos mediante `/api/admin/files/:fileId`.
- Exportacion operativa con minimizacion de datos mediante `/api/admin/export.csv`.
- Registro de acciones administrativas relevantes.
- Analisis de puntajes, estados y senales repetidas.
- Generacion, copia y descarga del borrador para OIRS o Transparencia.

El token admin se guarda unicamente en `sessionStorage` del navegador. Para desarrollo local se encuentra en `.dev.vars`, archivo ignorado por Git. En produccion se configura con `pnpm wrangler secret put ADMIN_TOKEN`.

El acceso admin no debe depender de seguridad por ocultamiento de rutas. Debe existir autenticacion o token server-side, idealmente con control de sesiones y rotacion de credenciales.

## Privacidad

Principios obligatorios:

- Solicitar solo la informacion necesaria para analizar y respaldar el caso.
- Informar finalidad, uso, retencion y contacto responsable.
- Permitir anonimizar o seudonimizar publicaciones y reportes.
- Evitar publicar datos personales, RUT, direcciones, telefonos, correos, firmas o documentos completos sin base legal y consentimiento cuando corresponda.
- Remover metadatos sensibles de archivos cuando sea viable.
- Restringir acceso a evidencia original.
- Mantener una politica de retencion y eliminacion.

La plataforma debe tratar las cargas como potencialmente sensibles aunque el usuario las haya enviado voluntariamente.

## Validacion

Validaciones esperadas:

- Campos requeridos y formatos.
- Normalizacion de fechas, regiones, programas y convocatorias.
- Limites de longitud para relatos y observaciones.
- Validacion de archivos: tipo MIME, extension, peso, cantidad y contenido permitido.
- Verificacion Turnstile antes de aceptar envios publicos.
- Sanitizacion de texto mostrado en UI.
- Estados moderados antes de publicar informacion agregada o narrativa.
- Respuestas de error sin filtrar detalles internos.

Checks de calidad antes de publicar cambios:

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

## Checklist Legal y Operativo

Ver tambien [docs/checklist-legal-operativo.md](docs/checklist-legal-operativo.md).

Antes de operar publicamente:

- Revisar textos publicos para evitar afirmaciones acusatorias no acreditadas.
- Publicar terminos de uso y politica de privacidad.
- Definir base legal para tratamiento de datos personales.
- Definir politica de retencion, rectificacion y eliminacion.
- Establecer proceso de moderacion y respuesta a solicitudes de retiro.
- Registrar criterios de validacion de evidencia.
- Configurar Turnstile, D1, R2 y secretos del Worker.
- Probar recuperacion de datos, exportacion y restricciones admin.

## Limitaciones

- El MVP no determina responsabilidades legales ni administrativas.
- La evidencia enviada por usuarios requiere revision antes de ser usada en conclusiones publicas.
- Las estadisticas pueden estar sesgadas por autoseleccion de participantes.
- Los adjuntos pueden contener datos personales o informacion de terceros.
- La exportacion estatica de Next no soporta SSR; cualquier logica server-side debe vivir en el Worker API.
- La seguridad depende de configurar correctamente bindings, secretos, permisos, CORS, Turnstile y controles admin.

## Comandos Rapidos

```powershell
pnpm install
pnpm typecheck
pnpm lint
pnpm build

pnpm wrangler d1 create evidencia_resultados
pnpm wrangler r2 bucket create evidencia-resultados
pnpm wrangler secret put ADMIN_TOKEN
pnpm wrangler secret put TURNSTILE_SECRET_KEY
pnpm wrangler secret put FILE_SIGNING_SECRET
pnpm wrangler d1 migrations apply evidencia_resultados --local
pnpm wrangler d1 migrations apply evidencia_resultados --remote

pnpm worker:dev
pnpm deploy
pnpm deploy:pages
```
