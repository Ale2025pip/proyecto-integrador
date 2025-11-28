CodeStore - Backend CRUD - Práctico Integrador

API RESTful desarrollada con Node.js, Express y MongoDB para el práctico integrador.
 Permite realizar operaciones CRUD sobre productos y compras, con autenticación JWT, validación de datos y sistema de logging.

Funcionalidades

Autenticación JWT - Login y registro de usuarios
Módulo ABMC Completo - Alta, Baja, Modificación, Consulta de productos y compras
Validación de Datos - Middlewares de validación para entradas
Autorización por Roles - Middleware admin para rutas protegidas
Sistema de Logging - Registro de errores y operaciones

Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Bcryptjs para encriptación
- CORS para frontend

Estructura del Proyecto

backend/
├── models/
│ ├── Producto.js # Entidad principal
│ ├── Compra.js # Entidad de soporte
│ ├── Pedido.js # Entidad de soporte
│ └── User.js # Modelo de usuario
├── controllers/
│ ├── authController.js
│ ├── productoController.js
│ └── compraController.js
├── routes/
│ ├── auth.js
│ ├── productos.js
│ └── compras.js
├── middlewares/
│ ├── auth.js # Autenticación JWT
│ └── admin.js # Autorización por roles
├── config/
│ └── database.js
└── server.js

🔗 Entidades y Relaciones

Entidad Principal: Producto
- `nombre` (String)
- `descripcion` (String) 
- `precio` (Number)
- `categoria` (String)
- `stock` (Number)
- `imagen` (String)
- `usuario` (Reference to User)

Entidad de Soporte: Compra
- `fechaCompra` (Date)
- `direccion` (String)
- `productos` (Array of Product references)
- `cantidad` (Number)
- `total` (Number)
- `usuario` (Reference to User)

Endpoints Principales

Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login de usuarios

Productos (CRUD Completo)
- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/:id` - Obtener un producto
- `POST /api/productos` - Crear producto (Admin only)
- `PUT /api/productos/:id` - Actualizar producto (Admin only) 
- `DELETE /api/productos/:id` - Eliminar producto (Admin only)

Compras (CRUD Completo)
- `GET /api/compras` - Listar compras
- `POST /api/compras` - Crear nueva compra
- `GET /api/compras/usuario/:userId` - Compras por usuario

Autenticación y Autorización
- Tokens JWT para autenticación
- Middleware de verificación de token
- Middleware de autorización por roles (admin/user)
- Rutas protegidas para operaciones CRUD

Validación de Datos
- Validación de entradas en endpoints críticos
- Sanitización de datos
- Manejo centralizado de errores

🔗 Repositorios Relacionados
[Frontend React](https://github.com/Ale2025pip/proyecto-integrador-frontend)
[Demo en Vivo](https://code-store-psi.vercel.app/)

Configuración
Crear archivo `.env` con:
```env
MONGODB_URI=tu_connection_string_mongodb
JWT_SECRET=tu_jwt_secret
PORT=3000
NODE_ENV=development