# Asset provenance

All project imagery is original AI-generated concept imagery for this fictional portfolio company. It is not evidence of real-world project ownership. The user's latest instruction removes public concept/demo notices; the internal provenance remains explicit.

## Project photographs

Created with the built-in OpenAI ImageGen tool on 14 September 2026. The complete, exact prompts, references and original output paths are in `IMAGE-PROMPTS.json`. Final responsive WebP files live in `public/images`; their JSON sidecars preserve prompts. No images are hotlinked.

| Project | Original photographs | Use |
| --- | ---: | --- |
| North Channel Crossing | 4 | Opening, waterline, cable details, approach |
| Kestrel Container Terminal | 4 | Opening, quay, concrete interface, gantry |
| Wadi Water Programme | 4 | Opening, pump hall, basin, site access |
| Atlas Freight Corridor | 2 | Corridor and civil detail |
| Redstone Industrial Campus | 2 | Campus and internal steelwork |
| Westhaven Coastal Works | 1 | Opening plus a closer CSS detail view |
| Mesa Processing Works | 1 | Opening plus a closer CSS detail view |
| Southern Grid Connection | 1 | Opening plus a closer CSS detail view |

The final three requested second photographs could not be generated because the image service reached its quota. Their complete gallery views use intentional CSS enlargement of the original project photo, preserving the same structure and setting. These are alternate views of an existing asset, not independent photographs. No placeholder or broken-image fallback is shipped.

Final files have a large 1920px target and a 720px responsive counterpart; source dimensions are preserved when smaller than target. The generated photo set uses a consistent 16:9 aspect ratio. Photos are converted to WebP at quality 86/80 and keep reserved display dimensions.

## Social covers

`public/og/home.jpg` is the generated NORTHFORGE social cover, with exact brand and headline typography from the supplied generation prompt. Eight route-specific 1200×630 photo covers reuse each project's opening photograph. JPEG metadata preserves the generation prompts. The metadata identifies the matching project title and description; only the homepage cover has baked-in typography.

## Other assets

- **Manrope**: self-hosted Latin variable font obtained from `@fontsource-variable/manrope` 5.3.0. SIL Open Font License included at `public/fonts/OFL.txt`. No runtime font requests.
- **Noto Sans Arabic**: Arabic-script variable font for Arabic and Sorani, obtained from `@fontsource-variable/noto-sans-arabic` 5.3.0. [Fontsource package documentation](https://fontsource.org/fonts/noto-sans-arabic/install). Bundled as `public/fonts/noto-sans-arabic.woff2`, with the SIL Open Font License at `public/fonts/NotoSansArabic-OFL.txt`. Served locally with `next/font/local`; no third-party font request.
- **World map**: Natural Earth 1:110m land polygons, public domain. Source: [Natural Earth vector repository](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson). [Terms of use](https://www.naturalearthdata.com/about/terms-of-use/). Simplified into a local SVG using an equirectangular projection with the same coordinate transform as project markers. Viewport covers 80°N to 60°S.
- **Wordmark, N symbol, favicon and icons**: authored SVG/vector interface assets. No third-party brand assets.
- **Bridge diagram**: authored SVG explanatory structural diagram, not a construction drawing or engineering specification.

## Maintenance

Keep exact provenance with new raster files. Use `scripts/import-assets.mjs` for importing available originals; originals are not required to build the committed website. Review image consistency before changing galleries. Never substitute recognizable real projects while retaining NORTHFORGE ownership implications.
