# Tutorial de uso

Esta guia explica como usar `Calendario Vida Real` paso a paso.

## 1. Abrir la aplicacion

1. Inicia el servidor:

```bash
npm start
```

2. Abre en el navegador:

```text
http://localhost:3000
```

## 2. Iniciar sesion

En la parte superior veras el bloque de sincronizacion.

1. Escribe tu correo.
2. Escribe tu contraseña.
3. Pulsa `Entrar`.

Si aun no tienes cuenta:

1. Escribe tu correo.
2. Escribe una contraseña.
3. Pulsa `Registrarme`.
4. Luego pulsa `Entrar`.

Cuando la sesion este activa, la app mostrara que estas conectado y podras sincronizar entre dispositivos.

## 3. Entender la pantalla principal

La pagina tiene varias zonas:

- `Calendario`: muestra el mes, semana o dia.
- `Filtros`: te deja buscar actividades o ver solo algunas categorias.
- `Paneles inferiores`: muestran agenda, dia seleccionado, plan inteligente, notas, perfil academico y mas.

## 4. Cambiar de vista

Arriba del calendario puedes elegir:

- `Mes`
- `Semana`
- `Dia`

Tambien puedes usar:

- flecha izquierda: periodo anterior
- flecha derecha: periodo siguiente
- `Ir a hoy`: vuelve al dia actual

## 5. Crear una actividad

1. Pulsa `Nueva actividad`.
2. Completa los campos principales:
   - fecha
   - hora
   - titulo
3. Si quieres, agrega:
   - descripcion
   - ubicacion
   - duracion
   - categoria
   - prioridad
   - estado
   - repeticion
   - checklist
4. Pulsa `Guardar`.

Tambien puedes agregar actividades desde:

- el boton `Agregar` del panel de dia seleccionado
- el boton `+` dentro de un dia del calendario

## 6. Editar, duplicar o eliminar una actividad

1. Haz clic sobre la actividad.
2. Se abrira el formulario.
3. Desde ahi puedes:
   - editarla
   - duplicarla
   - eliminarla

Dentro de las tarjetas tambien hay acciones rapidas para:

- completar o reabrir
- duplicar
- marcar como favorita

## 7. Mover actividades

En varias vistas puedes arrastrar actividades.

- en el calendario: moverlas a otro dia
- en la vista diaria: moverlas a otra hora

Solo arrastra el bloque y sueltalo en el nuevo lugar.

## 8. Usar los filtros

Debajo de la barra principal tienes filtros para:

- buscar por texto
- categoria
- estado
- prioridad
- favoritas

Si quieres volver a ver todo, pulsa `Limpiar filtros`.

## 9. Leer los colores de los bloques

La app diferencia visualmente:

- `Clases`
- `Estudio`
- `Tiempo personal`
- `Otros bloques`

Arriba del calendario veras una leyenda con esos tipos.

Si una actividad pertenece a un `ramo`, tambien mostrara una etiqueta con color propio para esa asignatura.

## 10. Usar el panel “Dia seleccionado”

Cuando haces clic en un dia:

1. Se actualiza el panel `Dia seleccionado`.
2. Alli veras todas las actividades de esa fecha.
3. Desde ese panel puedes:
   - revisar el dia
   - agregar una nueva actividad
   - planificar automaticamente

## 11. Usar “Planear mi dia”

1. Selecciona un dia.
2. Pulsa `Planear mi dia`.

La app intentara:

- ordenar tareas
- ocupar huecos libres
- sugerir bloques
- recomendar descansos

## 12. Usar “Plan inteligente”

Ese panel muestra:

- huecos disponibles
- sugerencias de estudio
- sugerencias de descanso
- tiempos libres

Sirve para ver rapidamente si tu dia esta muy lleno o aun tiene espacio.

## 13. Automatizaciones

En el panel `Automatizaciones` puedes ejecutar reglas como:

- mover pendientes atrasados
- crear estudio previo para examenes
- sugerir descanso entre bloques seguidos

Pulsa `Ejecutar` para correrlas.

## 14. Replanificacion

En `Replanificacion` puedes pedir sugerencias si el dia esta sobrecargado.

1. Pulsa `Sugerir`.
2. La app mostrara que tareas convendria mover.

## 15. Notas rapidas

El panel `Notas rapidas` funciona como un post-it.

- escribe una nota corta
- queda guardada para la fecha seleccionada

Sirve para ideas, pendientes o recordatorios breves.

## 16. Perfil academico

En `Perfil academico` puedes rellenar manualmente:

- nombre del estudiante
- carrera
- universidad
- año

Esto deja tu contexto academico guardado en la app.

## 17. Plantillas

En `Plantillas` puedes aplicar estructuras ya preparadas, como:

- rutina de estudio
- semana de trabajo
- horario universidad
- habitos diarios

Puedes:

1. Pulsar `Configurar`.
2. Ajustar fechas y bloques.
3. Pulsar `Aplicar`.

## 18. Seguimiento por ramo

En el panel `Seguimiento por ramo` puedes escribir una linea por asignatura.

Formato:

```text
Calculo|62|5.8|Parcial 12-04, Examen 28-06
Fisica|40|5.2|Laboratorio 18-04
```

Cada linea significa:

- nombre del ramo
- porcentaje de avance
- nota
- fechas importantes

La app mostrara tarjetas con el progreso de cada ramo.

## 19. Simulador de semestre

En `Simulador de semestre` puedes escribir los ramos del semestre.

Formato:

```text
Calculo|3|2|Mie 10:00
Fisica|2|1|Lun 08:30
```

Cada linea significa:

- nombre del ramo
- clases por semana
- evaluaciones
- bloque preferido

Luego pulsa `Planificar`.

La app hara esto:

- crear bloques de clase
- crear bloques de estudio
- asignarlos al ramo correspondiente
- detectar semanas con alta carga academica

## 20. Bienestar y apoyo

La pagina incluye:

- `Modo no burnout`
- `Retroalimentacion`
- `Mensaje para ti`
- `Modo vida real`

Puedes marcar como te fue en el dia y recibir recomendaciones o mensajes de apoyo.

## 21. Exportar PDF

1. Pulsa `Descargar PDF`.
2. La app generara un archivo PDF del calendario visible o filtrado.

## 22. Importar actividades

1. Pulsa `Importar`.
2. Elige un archivo JSON valido.
3. La app cargara esas actividades.

## 23. Sincronizar datos

Si ya iniciaste sesion:

1. Pulsa `Sincronizar`.
2. Los datos se guardaran en tu cuenta.

Asi puedes ver lo mismo en:

- PC
- celular

## 24. Instalar como app

Si el navegador lo permite:

1. Pulsa `Instalar app`.
2. La pagina se instalara como una aplicacion.

## 25. Recomendacion de uso

Para aprovechar bien la pagina:

1. Completa tu perfil academico.
2. Carga tus ramos.
3. Usa el simulador de semestre.
4. Agrega actividades reales.
5. Revisa los huecos libres.
6. Usa `Planear mi dia`.
7. Anota como te fue.

## 26. Si algo no se ve actualizado

Si haces cambios y no aparecen:

1. pulsa `Ctrl + F5`
2. o abre la app en modo incognito

Eso suele resolver problemas de cache del navegador o de la PWA.

