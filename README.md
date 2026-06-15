# HuanchacoLimpio-Web

Dashboard web ambiental para la gestión de reportes de residuos sólidos en el balneario de Huanchaco, Perú.

## Tecnologías

- Vite + React 18
- Firebase SDK v10 con Realtime Database
- React Router v6
- Recharts
- Leaflet + React Leaflet
- CSS responsive personalizado

## Instalación

```bash
npm install
npm run dev
```

Luego abre la URL que aparece en consola, normalmente:

```bash
http://localhost:5173
```

## Configuración Firebase

Edita el archivo:

```bash
src/firebase/config.js
```

Reemplaza:

```js
apiKey: 'TU_API_KEY',
messagingSenderId: 'TU_SENDER_ID',
appId: 'TU_APP_ID'
```

por los valores reales de tu proyecto Firebase.

## Modelo de datos en Realtime Database

Ruta principal:

```bash
reportes
```

Estructura esperada:

```json
{
  "tipoResiduo": "Plástico",
  "zona": "Muelle de Huanchaco",
  "fotoUrl": null,
  "latitud": -8.0812,
  "longitud": -79.1208,
  "estado": "En proceso",
  "timestamp": 1718000000000,
  "kgEstimado": 10
}
```

## Páginas incluidas

- Dashboard principal
- Mapa ciudadano
- Todos los reportes
- Estadísticas ambientales

## Nota

El proyecto incluye datos de ejemplo si Firebase no tiene registros o si todavía no está configurado.
