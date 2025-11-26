Backend CRUD - Práctico Integrador

API RESTful desarrollada con Node.js, Express y MongoDB para el práctico integrador.

## 🚀 Funcionalidades

- Autenticación JWT (Login/Registro)
- CRUD completo de Productos
- CRUD completo de Compras
- Paginación en consultas
- Validación de datos
- Relaciones entre entidades

## 📦 Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Bcryptjs para encriptación
- CORS para frontend

## 🛣️ Endpoints

### Autenticación
- POST `/api/auth/register` - Registro de usuario
- POST `/api/auth/login` - Login de usuario

### Productos (Protegido)
- GET `/api/productos` - Listar productos (con paginación)
- GET `/api/productos/:id` - Obtener producto por ID
- POST `/api/productos` - Crear producto
- PUT `/api/productos/:id` - Actualizar producto
- DELETE `/api/productos/:id` - Eliminar producto

### Compras (Protegido)
- GET `/api/compras` - Listar compras (con paginación)
- GET `/api/compras/:id` - Obtener compra por ID
- POST `/api/compras` - Crear compra
