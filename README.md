# Calendario Vida Real

Aplicacion web de calendario y planificacion personal/academica construida como PWA, con almacenamiento local, sincronizacion en Supabase y multiples capas de productividad, bienestar y organizacion academica.

## Estado del proyecto

Este proyecto evoluciono desde un calendario mensual simple hasta una aplicacion de organizacion integral. Actualmente incluye:

- calendario mensual, semanal y diario
- vista diaria por horas
- actividades con categoria, prioridad, estado, ubicacion y recurrencia
- subtareas y progreso
- automatizaciones y planificacion inteligente
- soporte academico con perfil, seguimiento por ramo y simulador de semestre
- exportacion PDF
- sincronizacion entre dispositivos con Supabase
- instalacion como PWA en PC y celular

## Tecnologias

- `HTML`, `CSS`, `JavaScript` plano
- `Express` para servir la app
- `Supabase` para autenticacion y sincronizacion
- `jsPDF` local para generar PDF sin internet
- `Service Worker` + `manifest` para modo PWA

## Estructura principal

- [index.html](C:\Proyectos\Calendario\index.html): interfaz principal
- [styles.css](C:\Proyectos\Calendario\styles.css): estilos, layout y jerarquia visual
- [app.js](C:\Proyectos\Calendario\app.js): logica del calendario, paneles, automatizaciones y capa academica
- [sync.js](C:\Proyectos\Calendario\sync.js): login, sesion y sincronizacion con Supabase
- [server.js](C:\Proyectos\Calendario\server.js): servidor Express
- [manifest.webmanifest](C:\Proyectos\Calendario\manifest.webmanifest): configuracion PWA
- [sw.js](C:\Proyectos\Calendario\sw.js): service worker
- [pwa.js](C:\Proyectos\Calendario\pwa.js): instalacion y soporte PWA en cliente
- [SUPABASE_SETUP.sql](C:\Proyectos\Calendario\SUPABASE_SETUP.sql): tabla y politicas para sincronizacion
- [SETUP.md](C:\Proyectos\Calendario\SETUP.md): guia de configuracion
- [DEPLOY.md](C:\Proyectos\Calendario\DEPLOY.md): guia de despliegue

## Funcionalidades implementadas

### 1. Calendario base

- vista `Mes`, `Semana` y `Dia`
- navegacion por periodo
- ir al dia actual
- seleccion de fecha
- crear, editar, duplicar y eliminar actividades

### 2. Actividades

Cada actividad soporta:

- fecha
- hora
- todo el dia
- titulo
- descripcion
- ubicacion
- duracion
- categoria
- prioridad
- estado
- favorita
- repeticion diaria, semanal o mensual
- repeticion hasta una fecha
- checklist de subtareas

### 3. Persistencia local

Se usa `localStorage` para guardar:

- actividades
- estado emocional diario
- objetivos semanales
- configuraciones de plantillas
- notas rapidas
- perfil academico
- seguimiento por ramo
- simulador de semestre

## 4. Exportacion e importacion

- exportacion en `PDF` usando [jspdf.umd.min.js](C:\Proyectos\Calendario\jspdf.umd.min.js)
- importacion de actividades desde JSON
- la libreria PDF se carga localmente, por lo que funciona sin internet

## 5. PWA y multiplataforma

La app puede instalarse en:

- PC
- celular

Incluye:

- iconos
- manifest
- service worker
- soporte de instalacion

## 6. Supabase y sincronizacion

Se implemento:

- autenticacion con `email + contraseña`
- sesion persistente
- sincronizacion de estado entre dispositivos
- carga inicial desde nube
- guardado automatico al cambiar datos

Claves necesarias en `.env`:

```env
PORT=3000
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

## 7. Analisis y productividad

Paneles agregados:

- resumen por categoria
- graficos semanales
- tiempo acumulado por categoria
- actividades atrasadas
- proximas actividades

## 8. Planificacion inteligente

Se incorporo:

- deteccion de huecos libres
- sugerencia de estudio, descanso o tiempo libre
- boton `Planear mi dia`
- insercion de descansos sugeridos
- deteccion de carga alta
- replanificacion inteligente para mover tareas a dias mas livianos

## 9. Automatizaciones

Reglas implementadas:

- mover tareas pendientes vencidas al dia siguiente
- crear bloques de estudio previos si detecta examenes
- sugerir descanso cuando hay varios bloques seguidos

## 10. Bienestar y acompañamiento

Se agrego:

- modo no burnout
- feedback rapido de animo diario
- panel `Modo vida real`
- panel `Mensaje para ti` con mensajes de apoyo al iniciar sesion
- recomendaciones basadas en la carga del dia

## 11. Plantillas configurables

Plantillas disponibles:

- rutina de estudio
- semana de trabajo
- horario universidad
- habitos diarios

Cada plantilla se puede configurar manualmente con:

- fecha desde
- fecha hasta
- tipo de repeticion
- lineas con dia, hora, duracion, titulo, lugar, categoria y prioridad

## 12. Perfil academico

El panel academico permite guardar manualmente:

- nombre del estudiante
- carrera
- universidad
- año

## 13. Seguimiento por ramo

Se agrego un panel para ingresar ramos manualmente en formato texto y mostrar:

- porcentaje de avance
- nota actual
- fechas importantes

Cada ramo recibe ademas un color propio para facilitar su lectura.

Formato:

```text
Calculo|62|5.8|Parcial 12-04, Examen 28-06
Fisica|40|5.2|Laboratorio 18-04
```

## 14. Simulador de semestre

Se agrego un panel para ingresar ramos del semestre y:

- generar automaticamente bloques de clase
- generar bloques de estudio por ramo
- detectar semanas con alta carga academica
- visualizar la carga de semanas futuras

Formato:

```text
Calculo|3|2|Mie 10:00
Fisica|2|1|Lun 08:30
```

Significado:

- nombre del ramo
- clases por semana
- evaluaciones
- bloque preferido

## 15. Diferenciacion visual por bloques

La vista de calendario distingue:

- `Clases`
- `Estudio`
- `Tiempo personal`
- `Otros bloques`

Ademas:

- los bloques generados por el simulador quedan vinculados al ramo
- cada ramo usa un color propio consistente
- ese color aparece en seguimiento, agenda y calendario

## 16. Notas rapidas

Se agrego un panel tipo post-it:

- guarda una nota por fecha seleccionada
- se almacena localmente
- entra en la sincronizacion

## 17. Mejoras de interfaz realizadas

Durante la evolucion del proyecto se hicieron varios ajustes visuales:

- compactacion de tarjetas dentro del calendario
- paso de panel lateral a paneles debajo del calendario
- grilla de paneles en 2 columnas
- algunas tarjetas clave en doble ancho
- jerarquia visual por importancia
- separacion semantica por accion, bienestar, analisis y seguimiento
- panel de apoyo
- leyenda de bloques por tipo

## Flujo de uso recomendado

1. Configurar Supabase y arrancar la app.
2. Completar el perfil academico.
3. Cargar ramos en seguimiento y en simulador.
4. Aplicar plantillas si corresponde.
5. Crear o ajustar actividades.
6. Usar `Planear mi dia`.
7. Revisar replanificacion, bienestar y carga semanal.

## Ejecucion local

Desde [package.json](C:\Proyectos\Calendario\package.json):

```bash
npm start
```

Luego abrir:

```text
http://localhost:3000
```

## Despliegue

El proyecto fue preparado para despliegue en Render.

Archivos utiles:

- [render.yaml](C:\Proyectos\Calendario\render.yaml)
- [DEPLOY.md](C:\Proyectos\Calendario\DEPLOY.md)

## Notas tecnicas

- la copia estable y activa del proyecto quedo en `C:\Proyectos\Calendario`
- originalmente hubo problemas trabajando desde OneDrive, por eso se uso esta copia fuera de esa ruta
- varios textos se fueron corrigiendo por temas de codificacion
- la app mezcla logica de productividad general y organizacion academica

## Posibles mejoras futuras

- limpiar por completo todos los textos con codificacion rara que queden en HTML heredado
- asignar manualmente tipo visual de bloque desde el formulario de actividad
- calendario compartido entre varios usuarios
- integracion real con mapas para traslados
- integracion real con Notion y WhatsApp
- despliegue publico definitivo

