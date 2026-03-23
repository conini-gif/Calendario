# Calendario Vida Real - Setup Supabase

## 1. Crear proyecto en Supabase
- Entra a https://supabase.com
- Crea un proyecto nuevo
- Abre Settings > API
- Copia:
  - Project URL
  - anon public key

## 2. Pegar credenciales
Edita el archivo `.env` en esta carpeta y completa:
- SUPABASE_URL
- SUPABASE_ANON_KEY

## 3. Crear la tabla de sincronizacion
En Supabase > SQL Editor, ejecuta el contenido de `SUPABASE_SETUP.sql`

## 4. Activar acceso por email
En Supabase > Authentication > Providers:
- habilita Email

## 5. Arrancar la app
En esta carpeta ejecuta:
- npm start

Luego abre:
- http://localhost:3000

## 6. Sincronizar entre celular y PC
- escribe tu email en la barra superior
- pulsa `Entrar`
- abre el link que Supabase te envia
- entra con el mismo email en celular y en PC

## 7. Instalar como app
En Chrome o Edge:
- abre la app
- pulsa `Instalar app`

## Notas
- La carpeta recomendada para trabajar es `C:\Proyectos\Calendario`
- La copia dentro de OneDrive puede dar errores de permisos al arrancar Node
