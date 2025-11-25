# Trabajo Práctico Final - API de Gestión de Recetas

**Equipo de Desarrollo:**
- [Gian, Julieta, Tobias]

**Fecha**: Noviembre 2025  
**Curso**: Analista de Sistemas - ORT

---

## Descripción

Este trabajo práctico busca que los estudiantes puedan aplicarse como desarrolladores de software. A diferencia de los anteriores, donde la consigna estaba completamente definida, este proyecto invita a desarrollar un proyecto, incluyendo la propuesta, el diseño y la implementación del mismo. Durante todo el proceso, se contará con el acompañamiento docente.

**API REST** desarrollada en Node.js que implementa un sistema de **gestión de recetas** con autenticación JWT, operaciones CRUD completas, módulo de exportación CSV y estadísticas. Incluye documentación interactiva con Swagger (OpenAPI 3.0), seguridad implementada con Helmet y rate limiting, y persistencia en Supabase.

---

## Despliegue

**La API está desplegada y funcionando en:**

- **URL Base:** https://thp2trabajopractico-n1gj.onrender.com
- **Documentación Interactiva:** https://thp2trabajopractico-n1gj.onrender.com/api/docs

> **Probala directamente desde Swagger UI** - No necesitas instalar nada localmente para probar la API.

---

## Objetivos

- Integrar en un único trabajo todos los conocimientos adquiridos a lo largo de las materias de programación cursadas y en curso.
- Adquirir un mayor entendimiento de las metodologías de trabajo aplicadas en la elaboración de software, incluyendo:
  - Análisis del proyecto
  - Definición del alcance del proyecto
  - Planificación del proyecto
  - Presentación oral de informes de avance
  - Entrega semanal de un ejecutable con un incremento visible y comprobable de sus funcionalidades, libre de errores

---

## Tecnologías Utilizadas

### **Backend**
- **Node.js** v20+ - Entorno de ejecución
- **Express.js** v5.1.0 - Framework web
- **ES6+ Modules** - Import/Export nativo

### **Base de Datos**
- **Supabase** (PostgreSQL) - Base de datos en la nube

### **Autenticación y Seguridad**
- **JWT (jsonwebtoken)** v9.0.2 - Tokens de autenticación
- **bcryptjs** v3.0.3 - Encriptación de contraseñas
- **Helmet** v8.1.0 - Headers de seguridad HTTP
- **express-rate-limit** v8.2.1 - Limitación de requests
- **CORS** - Control de acceso entre dominios

### **Documentación**
- **Swagger UI Express** v5.0.1 - Interfaz de documentación
- **YAML.js** v0.3.0 - Parser para OpenAPI YAML

### **Utilidades**
- **Morgan** v1.10.1 - Logging HTTP
- **dotenv** v17.2.3 - Variables de entorno
- **json2csv** v6.0.0 - Exportación de datos

### **Desarrollo**
- **Biome** v2.3.6 - Linter y formateador
- **Nodemon** v3.1.11 - Recarga automática en desarrollo

---

## Estructura del Proyecto

```
tp2-proyecto-final/
│
├── 📂 src/
│   ├── 📂 config/
│   │   ├── config.js              # Configuración centralizada
│   │   └── swagger.js             # Configuración de Swagger/OpenAPI
│   │
│   ├── 📂 controllers/            # Controladores de lógica de negocio
│   │   ├── auth.controller.js     # Autenticación (register, login, refresh)
│   │   └── receta.controller.js   # Gestión de recetas (CRUD + extras)
│   │
│   ├── 📂 db/
│   │   └── supabase.cnx.js        # Conexión a Supabase
│   │
│   ├── 📂 middleware/
│   │   ├── authenticateToken.js   # Middleware de autenticación JWT
│   │   └── requestLogger.js       # Middleware de logging personalizado
│   │
│   ├── 📂 models/                 # Modelos de datos
│   │   ├── receta.model.js        # Modelo de Receta
│   │   └── user.model.js          # Modelo de Usuario
│   │
│   ├── 📂 repository/             # Capa de acceso a datos
│   │   ├── log.repository.js      # Repositorio de logs
│   │   ├── receta.repository.js   # Repositorio de recetas
│   │   └── user.repository.js     # Repositorio de usuarios
│   │
│   ├── 📂 routes/                 # Definición de rutas
│   │   ├── auth.routes.js         # Rutas de autenticación
│   │   └── receta.routes.js       # Rutas de recetas
│   │
│   ├── 📂 services/               # Lógica de negocio
│   │   ├── receta.services.js     # Servicios de recetas
│   │   └── user.services.js       # Servicios de usuarios
│   │
│   ├── 📂 test/
│   │   └── pruebasUnitarias.http      # Pruebas manuales con REST Client
│   │
│   ├
│   │
│   ├── 📂 utils/
│   │   ├── jsonHandler.js         # Utilidades para JSON
│   │   └── recetas_export.csv     # Archivo de exportación generado
│   │
│   └── server.js                  # Punto de entrada del servidor
│
├── 📂 docs/
│   └── openapi.yaml               # Especificación OpenAPI 3.0 completa
│
├── 📂 node_modules/               # Dependencias (no versionado)
│
├── .env                           # Variables de entorno (no versionado)
├── .gitignore                     # Archivos ignorados por Git
├── biome.json                     # Configuración de Biome
├── package.json                   # Dependencias y scripts
├── package-lock.json              # Lockfile de dependencias
└── README.md                      # Este archivo
```

---

## 🚀 Instalación y Configuración

> **💡 Tip:** Si solo quieres probar la API, usa la versión en producción:  
> https://thp2trabajopractico-n1gj.onrender.com/api/docs

### **Entornos Disponibles**

| Entorno | URL | Uso |
|---------|-----|-----|
| **🌐 Producción** | https://thp2trabajopractico-n1gj.onrender.com | Pruebas y demostración |
| **💻 Local** | http://localhost:3000 | Desarrollo |

### **Requisitos Previos** (Solo para desarrollo local)
- **Node.js** v20 o superior
- **npm** v10 o superior
- Cuenta en **Supabase** (para la base de datos)
- **Git** (para clonar el repositorio)

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/JuuHood/THP2TrabajoPractico.git
cd THP2TrabajoPractico
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# ============================================
# Configuración del Servidor
# ============================================
PORT=3000
NODE_ENV=development

# ============================================
# Configuración JWT (Autenticación)
# ============================================
JWT_SECRET=tu_secreto_super_seguro_min_32_caracteres_aqui
JWT_REFRESH_SECRET=tu_refresh_secret_super_seguro_min_32_caracteres_aqui
JWT_EXPIRES_IN=15m

# ============================================
# Configuración de Supabase (Base de Datos)
# ============================================
# Obtén estos valores desde: https://app.supabase.com/project/[tu-proyecto]/settings/api
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-api-key-de-supabase
```

### **4. Configurar Supabase**

Asegúrate de tener las tablas `usuarios`, `recetas` y `logs` creadas en tu proyecto de Supabase.

> **Nota:** Si ya tienes el proyecto configurado con las tablas, salta este paso.

### **5. Iniciar el Servidor**

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

### **6. Acceder a la Documentación**

**Desarrollo Local:**  
Abre tu navegador en: **`http://localhost:3000/api/docs`**

**Producción (Ya Desplegado):**  
También puedes probar la API directamente en producción:  
**https://thp2trabajopractico-n1gj.onrender.com/api/docs**

---

## Documentación de la API

### **Deploy en Producción**

La API está desplegada y accesible en:

**URL de Producción:** https://thp2trabajopractico-n1gj.onrender.com

**Documentación Interactiva:** https://thp2trabajopractico-n1gj.onrender.com/api/docs

### **Swagger UI Interactivo**

La API cuenta con documentación completa e interactiva generada con **Swagger/OpenAPI 3.0**:

**URLs de Documentación:**
- **Producción:** https://thp2trabajopractico-n1gj.onrender.com/api/docs
- **Local:** `http://localhost:3000/api/docs`

**Características de la documentación:**
- ✅ Descripción completa de todos los endpoints
- ✅ Ejemplos de requests y responses
- ✅ Modelos de datos (schemas)
- ✅ Códigos de estado HTTP
- ✅ Interfaz "Try it out" para probar directamente desde el navegador
- ✅ Autenticación JWT integrada (botón "Authorize")

**Archivo fuente:** `docs/openapi.yaml` (730 líneas de especificación OpenAPI)

---

## Autenticación

### **Sistema JWT (JSON Web Tokens)**

La API utiliza un sistema de **doble token** para autenticación:

#### **1. Access Token**
- **Duración:** 15 minutos
- **Uso:** Autenticación en todos los endpoints protegidos
- **Header:** `Authorization: Bearer {accessToken}`

#### **2. Refresh Token**
- **Duración:** 7 días
- **Uso:** Renovar el access token sin volver a hacer login
- **Endpoint:** `POST /api/auth/refresh`

### **Flujo de Autenticación**

```
1. Login → accessToken (15min) + refreshToken (7 días)
2. Usar accessToken en requests protegidos
3. Cuando expire (15min) → usar refresh token
4. Obtener nuevo accessToken sin hacer login
5. Repetir hasta que refresh token expire (7 días)
6. Hacer login de nuevo
```

### **Ejemplo de Uso**

**1. Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"123456"}'
```

**Respuesta:**
```json
{
  "message": "Inicio de sesión exitoso",
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": 1,
    "nombre": "Usuario Demo",
    "email": "usuario@example.com",
    "role": "user"
  }
}
```

**2. Usar Access Token:**
```bash
curl -X GET http://localhost:3000/api/recetas \
  -H "Authorization: Bearer eyJhbGc..."
```

**3. Renovar Token:**
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"eyJhbGc..."}'
```

---

## Endpoints Principales

### **Autenticación**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | No |
| `POST` | `/api/auth/login` | Iniciar sesión (obtiene tokens) | No |
| `POST` | `/api/auth/refresh` | Renovar access token | No |

### **Recetas**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/recetas` | Listar todas las recetas |  Sí |
| `GET` | `/api/recetas/:id` | Obtener receta por ID |  Sí |
| `POST` | `/api/recetas` | Crear nueva receta |  Sí |
| `PUT` | `/api/recetas/:id` | Actualizar receta completa |  Sí |
| `DELETE` | `/api/recetas/:id` | Eliminar receta |  Sí |
| `GET` | `/api/recetas/exportar` | Exportar recetas a CSV |  Sí |
| `GET` | `/api/recetas/estadisticas` | Obtener estadísticas |  Sí |
| `DELETE` | `/api/recetas/all` | Eliminar todas (solo test) |  Sí |

---

## Ejemplos de Uso

### **Registro de Usuario**

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "nombre": "María García",
    "email": "maria@example.com",
    "role": "user"
  }
}
```

### **Crear Receta**

**Request:**
```http
POST /api/recetas
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "nombre": "Pizza Margherita",
  "ingredientes": "Harina, tomate, mozzarella, albahaca",
  "instrucciones": "Amasar, agregar ingredientes, hornear 15 minutos a 220°C"
}
```

**Response (201):**
```json
{
  "message": "Creado correctamente",
  "payload": {
    "id": 1,
    "nombre": "Pizza Margherita",
    "ingredientes": "Harina, tomate, mozzarella, albahaca",
    "instrucciones": "Amasar, agregar ingredientes, hornear 15 minutos a 220°C",
    "usuario_id": 1
  },
  "ok": true
}
```

### **Exportar Recetas a CSV**

**Request:**
```http
GET /api/recetas/exportar
Authorization: Bearer eyJhbGc...
```

**Response (200):**
- Descarga automática del archivo `recetas.csv`
- Contiene: id, nombre, ingredientes, instrucciones

### **Obtener Estadísticas**

**Request:**
```http
GET /api/recetas/estadisticas
Authorization: Bearer eyJhbGc...
```

**Response (200):**
```json
{
  "totalRecetas": 25,
  "recetasPorUsuario": {
    "María García": 10,
    "Juan Pérez": 8,
    "Ana López": 7
  },
  "ingredientesMasUsados": [
    { "ingrediente": "Tomate", "cantidad": 15 },
    { "ingrediente": "Harina", "cantidad": 12 }
  ]
}
```

---

## Códigos de Estado HTTP

| Código | Descripción | Cuándo se usa |
|--------|-------------|---------------|
| **200** | OK | Operación exitosa (GET, PUT, DELETE) |
| **201** | Created | Recurso creado exitosamente (POST) |
| **400** | Bad Request | Datos inválidos o faltantes |
| **401** | Unauthorized | Token requerido, inválido o expirado |
| **403** | Forbidden | Sin permisos (usuario desactivado, entorno incorrecto) |
| **404** | Not Found | Recurso no encontrado |
| **409** | Conflict | Email ya existe (registro duplicado) |
| **500** | Internal Server Error | Error del servidor |

---

## Pruebas

### **Pruebas Manuales con REST Client**

El proyecto incluye un archivo completo de pruebas manuales para VS Code:

**Archivo:** `src/test/pruebasUnitarias.http`

**Incluye:**
- **Casos felices:** Todas las funcionalidades principales
- **Casos no felices:** Validación de errores (400, 401, 404, 409)
- **19 casos de prueba** organizados por categorías:
  - Autenticación (6 casos: registro, login, refresh + errores)
  - Recetas CRUD (7 casos)
  - Casos de error (6 casos)

**Cómo usar:**
1. Instala la extensión "REST Client" en VS Code
2. Abre `src/test/pruebasUnitarias.http`
3. Haz clic en "Send Request" sobre cada test

---

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Ejecutar en modo desarrollo con nodemon (auto-reload)

# Producción  
npm start            # Ejecutar en modo producción (node)

# Linting y Formateo
npm run lint         # Verificar código con Biome (sin modificar)
npm run format       # Formatear código con Biome (modifica archivos)
```

---

## Seguridad Implementada

### **Medidas de Seguridad**

✅ **Contraseñas encriptadas** con bcryptjs (10 salt rounds)  
✅ **JWT con expiración** configurable (15 min access, 7 días refresh)  
✅ **Helmet** - Headers de seguridad HTTP  
✅ **CORS** - Control de acceso entre dominios  
✅ **Rate Limiting** - Máximo 100 requests por 15 minutos por IP  
✅ **Validación de datos** - Email único, campos requeridos  
✅ **Variables sensibles** - Almacenadas en `.env` (no versionado)  
✅ **Logging de requests** - Morgan + log personalizado en BD

### **Roles de Usuario**

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| `user` | Usuario estándar | CRUD de sus propias recetas |
| `admin` | Administrador | (Por implementar) Acceso completo |

---

## Casos de Uso de Complejidad Moderada/Alta

Según el enunciado del TP, se requieren **al menos 2 casos de uso** que transformen información para generar nueva información:

### **1. Exportador CSV** (`GET /api/recetas/exportar`)
**Complejidad:** Moderada
- Obtiene todas las recetas de la base de datos
- Transforma los datos a formato CSV
- Genera archivo descargable con librería json2csv
- Maneja casos de lista vacía

### **2. Módulo de Estadísticas** (`GET /api/recetas/estadisticas`)
**Complejidad:** Moderada-Alta
- Calcula total de recetas del sistema
- Agrupa recetas por usuario (contador)
- Analiza ingredientes más usados (parsing de strings)
- Genera métricas e indicadores estadísticos

---

## Base de Datos

### **Supabase (PostgreSQL)**

**Tablas principales:**

#### **usuarios**
```sql
id          | SERIAL PRIMARY KEY
nombre      | VARCHAR(255) NOT NULL
email       | VARCHAR(255) UNIQUE NOT NULL
password    | VARCHAR(255) NOT NULL (hasheado con bcrypt)
role        | VARCHAR(50) DEFAULT 'user'
created_at  | TIMESTAMP DEFAULT NOW()
```

#### **recetas**
```sql
id              | SERIAL PRIMARY KEY
nombre          | VARCHAR(255) NOT NULL
ingredientes    | TEXT NOT NULL
instrucciones   | TEXT NOT NULL
usuario_id      | INTEGER REFERENCES usuarios(id) ON DELETE CASCADE
created_at      | TIMESTAMP DEFAULT NOW()
```

#### **logs** (opcional)
```sql
id              | SERIAL PRIMARY KEY
method          | VARCHAR(10)
url             | TEXT
status          | INTEGER
response_time   | INTEGER
ip              | VARCHAR(50)
created_at      | TIMESTAMP DEFAULT NOW()
```

**Relaciones:**
- Usuario → Recetas (1:N) con CASCADE DELETE

---

## Notas Importantes

### **Variables de Entorno**
**NUNCA** subas el archivo `.env` al repositorio (debe estar en `.gitignore`)

### **JWT Secrets**
Usa cadenas largas y aleatorias en producción (mínimo 32 caracteres)

### **Base de Datos**
Usuarios y recetas se almacenan en **Supabase** (PostgreSQL en la nube)

### **Desarrollo**
El linter Biome está configurado para mantener consistencia en el código

### **Testing**
Las pruebas actualmente son **manuales** usando archivos `.http` con REST Client

### **Despliegue**
La aplicación está desplegada en **Render** y es accesible públicamente en:  
https://thp2trabajopractico-n1gj.onrender.com

---

## Enlaces Útiles

### **Proyecto**
- **API en Producción:** https://thp2trabajopractico-n1gj.onrender.com
- **Documentación Swagger:** https://thp2trabajopractico-n1gj.onrender.com/api/docs
- **Repositorio GitHub:** https://github.com/JuuHood/THP2TrabajoPractico

### **Herramientas**
- **Supabase Dashboard:** https://app.supabase.com
- **Render Dashboard:** https://dashboard.render.com

### **Documentación Técnica**
- **OpenAPI 3.0 Spec:** https://swagger.io/specification/
- **JWT Best Practices:** https://datatracker.ietf.org/doc/html/rfc8725
- **Express.js Docs:** https://expressjs.com

---

## Información Académica

**Institución:** ORT 
**Materia:** Taller de Herramientas de Programación 2  
**Año:** 2025  
**Docentes:** [Ocaña Anderson]

---

**Última actualización:** Noviembre 2025