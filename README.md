# CV de Pablo Álvaro Hidalgo

Versiones ES y EN orientadas a BI y Analytics Engineering. Revisión: 2026-11-08.

## Archivos

- `Docs/archive/2026-11-08-original/`: copias exactas de los cuatro originales, sin cambios.
- `Docs/src/CV-ES.tex` y `CV-EN.tex`: nuevas fuentes LaTeX.
- `Docs/pdf/`: nuevos PDF compilados.
- Los cuatro archivos originales de `Docs/` se conservan también en su ubicación inicial.
- `work/`: herramientas portátiles, compilaciones intermedias y revisión visual; ignorado por Git.

## Compilar

Con Tectonic disponible en PATH, desde la raíz:

```powershell
tectonic --outdir Docs/pdf Docs/src/CV-ES.tex
tectonic --outdir Docs/pdf Docs/src/CV-EN.tex
```

También se puede compilar con pdfLaTeX o importar los `.tex` en Overleaf.

## Criterio editorial

- Cargos y fechas originales conservados; titular orientado a BI y Analytics.
- Prioridad a SQL, Spark SQL, Databricks, Power BI y necesidades comerciales.
- AWS descrito como certificación y conocimiento teórico; Airflow en aprendizaje y PySpark básico.
- Sin atribuir creación de tablas/vistas persistentes, operación de pipelines ni ahorros no confirmados.
- Reducción de afirmaciones de automatización y separación entre certificación y formación.
- Fuera del CV actual: intercambio escolar, herramientas secundarias y detalles que dispersaban el enfoque. Permanecen en el archivo original.

## Pendiente de confirmar

- Enlaces directos de los tres proyectos: no se han inventado URLs. El encabezado enlaza al perfil de GitHub.
- Ejemplos y alcance concreto de SQL y Power BI, métricas de impacto y uso profesional de Python.
- Credenciales verificables de AWS, Snowflake y cursos.

El repositorio es local. No se ha publicado en GitHub, creado el fork ni desplegado la web.
