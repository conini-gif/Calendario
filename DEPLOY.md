# Publicar Calendario Vida Real

## Opcion recomendada: Render

1. Sube esta carpeta a GitHub.
2. Entra a https://render.com
3. Crea un nuevo `Web Service`.
4. Conecta tu repositorio.
5. Render detectara `render.yaml`.
6. En `Environment Variables`, agrega:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
7. Despliega.

## Luego en Supabase

En `Authentication > URL Configuration` agrega:
- `Site URL`: la URL publica de Render
- `Redirect URLs`: la misma URL publica

## Instalar en celular y PC

Cuando ya tenga URL publica:
- abre la app en Chrome o Edge
- inicia sesion
- pulsa `Instalar app`

Eso la deja usable en celular y PC con la misma cuenta.
