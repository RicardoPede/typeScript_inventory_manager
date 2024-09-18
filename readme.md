TypesScript
Inicializar proyecto:
```bash
npm init -y
```

Instalacion de dependencias:    
```bash
npm install -D typescript @types/node ts-node nodemon rimraf
```

Creación del directorio src y archivo app.ts:
```bash
mkdir src
touch src/app.ts
```

Configuracion de TypeScript

```bash
npx tsc --init --outDir dist/ --rootDir src
```

Creación del archivo nodemon.json:
```bash
touch nodemon.json
```
y en ella insertar el siguiente código:
```json
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "ignore": [],
    "exec": "npx ts-node ./src/app.ts"
}
```

Crear el script en el package.json:
```json
"scripts": {
    "dev": "nodemon",
    "build": "rimraf ./dist & tsc",
    "start": "npm run build & node dist/app.js"
},
```

# Trabajo Práctico: Desarrollo con TypeScript
### Objetivo:
Desarrollar una aplicación que gestione el inventario de equipos informáticos de una
empresa, utilizando TypeScript, una base de datos (PostgreSQL o MongoDB),
autenticación basada en JSON Web Token (JWT) y un front-end sencillo con React.

### Contexto:
La empresa FORMOTEX se dedica al mantenimiento y distribución de equipos
informáticos para diversas organizaciones. Actualmente, la empresa gestiona su inventario
de manera manual, lo que provoca errores en el seguimiento de los equipos, como la falta
de información actualizada sobre su estado, ubicación y fecha de adquisición.

### Requerimientos:
1. Funcionalidades CRUD:
• La aplicación debe permitir las operaciones básicas de gestión de equipos
informáticos.
• Solo los usuarios autenticados podrán acceder a la aplicación y realizar
operaciones CRUD.
• FUNCIONALIDAD ADICIONALES: Según su abstracción, determine las
funcionalidades adicionales, requeridas para el manejo de inventario de los
equipos informáticos.

2. Autenticación con JWT:
• Implementar un sistema de autenticación utilizando JWT.
• Los usuarios deben iniciar sesión utilizando un endpoint de autenticación.
• Una vez autenticados, recibirán un token que deberán enviar en el
encabezado de las solicitudes a los endpoints protegidos.
• Endpoints protegidos: Los endpoints de creación, actualización,
eliminación y listado de equipos deben requerir un token válido, y un rol
específico de usuario.
• Endpoints:
     POST /auth/login: Permitir a los usuarios autenticarse con
credenciales (usuario y contraseña).
     POST /auth/register: Permitir el registro de nuevos usuarios
(opcional).

3. Front-end con React:
• Crear un front-end sencillo que consuma la API.
• Implementar un formulario de login en React para permitir que los usuarios
ingresen sus credenciales y obtengan el JWT.
• Al iniciar sesión, almacenar el token en el localStorage del navegador.
• El front-end debe permitir a los usuarios visualizar el inventario de equipos,
agregar nuevos equipos, actualizar y eliminarlos.
• Enviar el JWT en el encabezado de cada solicitud para acceder a los
endpoints protegidos.

Pasos sugeridos:
1. Backend:
    • Diseñar el modelo de datos: Crear una tabla o colección para usuarios y
equipos.
    • Implementar JWT:
             Crear un sistema de registro e inicio de sesión.
             Generar y firmar un token JWT en el backend al autenticarse el
usuario.
             Proteger los endpoints de equipos con un middleware que valide el
token JWT.
    • Capa de servicio: Gestionar la lógica de negocio para usuarios y equipos.

2. Front-end (React):
    • Login: Crear una página de login donde el usuario introduzca su usuario y
contraseña.
    • Autenticación: Enviar las credenciales a un endpoint /auth/login para obtener
el token JWT y almacenarlo en el localStorage.
    • CRUD de equipos: Crear componentes React que permitan visualizar,
agregar, actualizar y eliminar equipos, asegurándose de enviar el token en
cada solicitud.
    • Desarrollar las interfaces de usuario para las funcionalidades
adicionales que haya determinado según su abstracción.

3. Validaciones:
    • En el back-end, validar que solo los usuarios autenticados puedan acceder a
los endpoints protegidos.
    • En el front-end, asegurarse de que los formularios de login y de equipos
tengan validaciones básicas.

4. Base de Datos:
    • Configurar la conexión con PostgreSQL o MongoDB según el sistema
elegido.
    • Utilizar JWT para permitir solo a los usuarios registrados realizar cambios
en la base de datos.

Herramientas recomendadas:
    • Backend:
         jsonwebtoken para el manejo de JWT.
         bcryptjs para encriptar contraseñas.
         Express.js como framework para construir la API.
         pg (PostgreSQL) o mongoose (MongoDB) para la conexión a la base de
datos.
    • Front-end:
         React para el desarrollo del front-end.
         axios o fetch API para hacer las solicitudes HTTP.

Criterios de Evaluación:
1. Correcta implementación de JWT para la autenticación.
2. Integración de la autenticación en el front-end.
3. Uso adecuado de TypeScript en el back-end y front-end.
4. Implementación de la capa de servicio en el back-end.
5. Funcionalidad completa (CRUD de equipos protegidos por autenticación).
6. Estética y funcionalidad del front-end en React.

***
***
# FORMOTEX 
## funcionaría de la siguiente manera:

### Funcionalidades Principales
Gestión de Equipos (CRUD)
Gestión de Categorías (CRUD)
Gestión de Usuarios (CRUD y Autenticación)
Historial de Movimientos
Autenticación y Autorización
Reportes y Notificaciones

### Flujo de Trabajo
1. Gestión de Equipos (CRUD)
Crear Equipo: Un administrador puede agregar un nuevo equipo al inventario proporcionando detalles como nombre, descripción, número de serie, categoría, estado, ubicación, fecha de compra, imagen, precio y stock.
Leer Equipos: Los usuarios pueden ver la lista de equipos en el inventario, filtrarlos por categoría, estado, ubicación, etc.
Actualizar Equipo: Un administrador puede actualizar la información de un equipo existente.
Eliminar Equipo: Un administrador puede eliminar un equipo del inventario.

2. Gestión de Categorías (CRUD)
Crear Categoría: Un administrador puede agregar una nueva categoría de equipos.
Leer Categorías: Los usuarios pueden ver la lista de categorías disponibles.
Actualizar Categoría: Un administrador puede actualizar la información de una categoría existente.
Eliminar Categoría: Un administrador puede eliminar una categoría.

3. Gestión de Usuarios (CRUD y Autenticación)
Registrar Usuario: Nuevos usuarios pueden registrarse proporcionando un nombre de usuario, contraseña y correo electrónico.
Iniciar Sesión: Los usuarios pueden iniciar sesión proporcionando sus credenciales.
Leer Usuarios: Un administrador puede ver la lista de usuarios registrados.
Actualizar Usuario: Un administrador puede actualizar la información de un usuario.
Eliminar Usuario: Un administrador puede eliminar un usuario.

4. Historial de Movimientos
Registrar Movimiento: Cada vez que un equipo cambia de ubicación o estado, se registra un movimiento en la colección MovementHistory.
Leer Historial de Movimientos: Los usuarios pueden ver el historial de movimientos de un equipo específico para rastrear su ubicación y estado a lo largo del tiempo.

5. Autenticación y Autorización
Autenticación: Utilizando JWT, los usuarios deben autenticarse para acceder a la aplicación.
Autorización: Basado en roles (admin y user), se controla el acceso a diferentes funcionalidades de la aplicación.

6. Reportes y Notificaciones
Generar Reportes: Los administradores pueden generar reportes sobre el estado del inventario, movimientos de equipos, etc.
Enviar Notificaciones: Notificaciones automáticas pueden ser enviadas a los usuarios sobre cambios importantes en el inventario, como equipos que necesitan mantenimiento o que han sido movidos.

## Integración de Backend y Frontend
### Backend
Rutas y Controladores: Las rutas y controladores en el backend manejarán las solicitudes CRUD para equipos, categorías, usuarios y movimientos.
Autenticación y Autorización: Middleware para manejar la autenticación y autorización de usuarios.
Base de Datos: MongoDB se utilizará para almacenar los datos de equipos, categorías, usuarios y movimientos.
### Frontend
Componentes de React: Componentes para manejar la visualización y manipulación de datos.
Redux: Para manejar el estado global de la aplicación.
React Router: Para manejar la navegación entre diferentes páginas.
Axios: Para hacer solicitudes HTTP al backend.
React Hook Form: Para manejar formularios de manera eficiente.
React Toastify: Para mostrar notificaciones.

# Ejecucion:
### Backend
.emv
```bash
PORT=4000
MONGO_URL=mongodb://localhost:27017
DB_HOST=localhost
DB_PORT=27017
DB_NAME=inventory_manager
DB_USER=root
DB_PASSWORD=root
JWT_SECRET=secret
```

***
***
# FORMOTEX
Posisionarse en la carpeta del proyecto Backend y ejecutar el siguiente comando:
```bash
npm run all
```