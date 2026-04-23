# Restaurant POS Backend

## Setup

1. Install dependencies:
   npm install

2. Create environment variables (Render or local):

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

3. Run:
   npm start

## Endpoints

POST /login
GET /mesas
PUT /mesas/:id
GET /menu
GET /inventario
POST /orden
GET /orden/mesa/:id
POST /orden/:id/detalle
PUT /orden/:id/cerrar
