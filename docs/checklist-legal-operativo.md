# Checklist Legal y Operativo

Este checklist ayuda a preparar la operacion de Evidencia Resultados antes de recibir, revisar o publicar antecedentes. No reemplaza asesoria legal.

## Lenguaje Publico

- Usar lenguaje descriptivo y basado en antecedentes verificables.
- Evitar imputaciones, insultos, acusaciones personales o conclusiones no acreditadas.
- Distinguir claramente entre relato de usuario, documento aportado, dato verificado y analisis propio.
- Incluir fecha de actualizacion en reportes o paginas informativas.

## Privacidad y Datos Personales

- Publicar politica de privacidad antes de abrir formularios publicos.
- Informar finalidad del tratamiento, responsable, contacto y derechos aplicables.
- Solicitar solo datos necesarios para analizar el caso.
- Permitir que el usuario oculte datos personales no esenciales.
- No publicar RUT, domicilio, telefono, correo, firmas, documentos completos ni identificadores de terceros sin justificacion y autorizacion.
- Definir retencion, eliminacion y respaldo de datos.
- Restringir acceso a evidencia original a personal autorizado.

## Evidencia y Adjuntos

- Definir tipos de documentos aceptados.
- Validar extension, MIME type, peso maximo y cantidad de archivos.
- Guardar archivos en R2 con nombres opacos.
- Guardar en D1 solo metadatos necesarios.
- Registrar fecha de carga, origen declarado y estado de revision.
- Revisar metadatos de archivos que puedan revelar informacion sensible.
- Mantener criterio de descarte para archivos ilegibles, duplicados o fuera de alcance.

## Validacion y Moderacion

- Verificar Turnstile antes de crear casos publicos.
- Normalizar campos como region, convocatoria, fecha y programa.
- Asignar estados de revision consistentes.
- Registrar observaciones internas sin exponerlas publicamente por defecto.
- Revisar manualmente cualquier caso antes de incluirlo en reportes narrativos.
- Separar estadisticas agregadas de casos identificables.

## Administracion

- Configurar autenticacion o token server-side para admin.
- Rotar credenciales si se comparten durante pruebas.
- Limitar permisos de lectura y descarga de adjuntos.
- Registrar acciones administrativas relevantes.
- Probar flujos de aprobacion, observacion, descarte y archivo.
- Definir responsable de responder solicitudes de rectificacion o retiro.

## Cloudflare

- Crear D1 con `pnpm wrangler d1 create evidencia_resultados`.
- Crear R2 con `pnpm wrangler r2 bucket create evidencia-resultados`.
- Configurar secretos con `pnpm wrangler secret put`.
- Verificar bindings del Worker antes de desplegar.
- Mantener secretos solo en Cloudflare/entorno seguro, no en el repositorio.
- Configurar CORS para permitir solo los origenes necesarios.
- Probar `pnpm worker:dev` antes de `pnpm deploy`.

## Publicacion

- Ejecutar `pnpm typecheck`.
- Ejecutar `pnpm lint`.
- Ejecutar `pnpm build`.
- Confirmar que Pages publica el directorio `out`.
- Confirmar que el frontend usa la URL correcta del Worker API.
- Confirmar que errores publicos no exponen stack traces, SQL, bindings ni secretos.
- Probar envio, validacion, carga de archivo, revision admin y lectura agregada.

## Riesgos y Limitaciones

- Los envios pueden ser incompletos, falsos, duplicados o sesgados.
- La participacion voluntaria no representa necesariamente el universo completo de postulantes.
- La revision humana reduce riesgo, pero no garantiza exactitud absoluta.
- La evidencia puede contener datos de terceros que requieren minimizacion.
- Cualquier publicacion debe ser proporcional, verificable y respetuosa.
