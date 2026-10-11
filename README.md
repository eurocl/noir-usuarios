# noir-usuarios

Backend independiente de Usuarios de Proyecto Noir. Incluye registro, login y perfil. No importa código de carpetas vecinas y tiene sus propias dependencias.

## Infraestructura

Repositorio exclusivo: https://github.com/eurocl/noir-usuarios. Servicio de Render: noir-usuarios. URL de la API: https://noir-users.onrender.com. MongoDB Atlas: clúster exclusivo de Usuarios, base noir_usuarios y colección users. Las credenciales se configuran de manera privada en DATABASE_URL.

## API

- GET /health: estado de conexión a MongoDB.
- POST /users/register: recibe name, email y password. Devuelve 201 al crear una cuenta.
- POST /users/login: recibe email y password. Devuelve un JWT y los datos públicos del usuario, o 401 si las credenciales no son válidas.
- GET /users/me: requiere Authorization: Bearer TOKEN. Nunca devuelve el hash de la contraseña.

Las pruebas de npm test cubren registro, hash de contraseñas, login, perfil, autenticación e independencia de la configuración. No escriben en una base real.

## Arranque

1. Instalar Node.js 24.
2. Ejecutar npm ci.
3. Copiar .env.example a .env y completar DATABASE_URL con la conexión del clúster de este backend.
4. Mantener DATABASE_NAME=noir_usuarios y completar los secretos necesarios.
5. Ejecutar npm start. La API comienza a escuchar después de conectarse a su base.
6. Consultar http://localhost:3001/health.

No hay fallback a MONGO_URI ni a la base de otro backend. Al arrancar, Mongoose conecta a Atlas. Si Atlas no está disponible, el proceso termina con error y debe reiniciarse una vez corregida la conexión. Una cuenta Atlas y un usuario de base de datos son cosas distintas: la aplicación usa el usuario de base de datos.

## Otra computadora o Render

En otra PC, usar HOST=0.0.0.0 y permitir el puerto en la red privada del equipo. Los clientes deben apuntar a la IP o nombre de esa PC, no a localhost. Mantener los secretos fuera de Git. En Render, Build Command npm ci, Start Command npm start y Health Check Path /health. Render asigna PORT. 

JWT_SECRET debe coincidir con el emisor de los tokens que valida el sistema. Compartir este secreto de autenticación no comparte el acceso a MongoDB.

## Datos

Usar una cuenta Atlas dedicada a este backend, con su propio proyecto, clúster y usuario de base de datos limitado a readWrite en noir_usuarios. No copiar aquí credenciales del clúster anterior. No migrar ni borrar datos desde el comando de arranque.
