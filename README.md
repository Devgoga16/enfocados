# Web — Centro Psicológico Integral Enfocados

Landing page hecha con [Astro](https://astro.build). Genera un sitio estático (HTML, CSS y JS) que se puede publicar en cualquier hosting.

## Comandos

```bash
npm install        # instalar dependencias (solo la primera vez)
npm run dev        # ver la web en http://localhost:4321 mientras se edita
npm run build      # generar la versión final en la carpeta dist/
npm run preview    # revisar la versión final antes de subirla
```

## Dónde se edita el contenido

Todo lo que cambia con frecuencia está en **`src/data/site.ts`**:

| Qué | Dónde |
|---|---|
| Teléfonos, direcciones, horarios y mapas de cada sede | `sedes` |
| Terapias | `terapias` |
| Promoción vigente (precios, fecha de vencimiento) | `promocion` |
| Novedades y eventos | `novedades` |
| Preguntas frecuentes | `preguntas` |
| Google Analytics 4 / Meta Pixel | `analitica` |

- **La promoción se oculta sola** cuando pasa la fecha `hasta`, aunque no se vuelva a publicar la web. Para una nueva campaña, se cambian los datos y la fecha.
- **Mapas:** en Google Maps → Compartir → Insertar un mapa → copiar solo la URL del `src` y pegarla en `mapaEmbed`.
- **Medición:** al pegar los IDs en `analitica`, cada clic en WhatsApp y cada envío del formulario se registran como conversión (`contacto_whatsapp` en GA4 y `Contact` en Meta).

## Antes de publicar

1. Poner el dominio final en `astro.config.mjs` (o la variable de entorno `SITE_URL` en el hosting).
2. Confirmar el número de WhatsApp de la sede Comas: la portada de Facebook dice **992 259 335**, pero el WhatsApp registrado es **992 259 535**.
3. Completar las direcciones, horarios y mapas de las sedes.
4. Que el centro revise la política de privacidad (`src/pages/privacidad.astro`).

## Cómo subirla

**Netlify o Vercel (recomendado, gratis):** subir el proyecto a GitHub e importarlo. Los dos detectan Astro solos (comando `npm run build`, carpeta `dist`). Cada cambio que se sube se publica automáticamente.

**Netlify sin GitHub:** ejecutar `npm run build` y arrastrar la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop).

**Hosting tradicional (Hostinger, cPanel, etc.):** ejecutar `npm run build` y subir el *contenido* de `dist/` a `public_html`.
