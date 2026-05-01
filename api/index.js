import express from "express"

const app = express()
const PORT = 3000

// Middleware para entender JSON
app.use(express.json())

// Primer endpoint de mi API - Datos iniciales de la API 
const videojuegos = [
  {
    id: crypto.randomUUID(),
    titulo: "The Legend of Zelda: Breath of the Wild",
    genero: "Aventura",
    plataforma: "Nintendo Switch",
    desarrollador: "Nintendo",
    año: 2017,
    calificacion: 9.5
  },
  {
    id: crypto.randomUUID(),
    titulo: "God of War",
    genero: "Acción",
    plataforma: "PlayStation 4",
    desarrollador: "Santa Monica Studio",
    año: 2018,
    calificacion: 9.3
  },
  {
    id: crypto.randomUUID(),
    titulo: "Minecraft",
    genero: "Sandbox",
    plataforma: "Multiplataforma",
    desarrollador: "Mojang",
    año: 2011,
    calificacion: 9.0
  },
  {
    id: crypto.randomUUID(),
    titulo: "Red Dead Redemption 2",
    genero: "Acción-Aventura",
    plataforma: "PlayStation 4",
    desarrollador: "Rockstar Games",
    año: 2018,
    calificacion: 9.7
  }
]

/*DESARROLLO DE LAS RUTAS PARA EL CRUD*/

// Solicitud HTTP GET: Permite obtener todos los elementos de un recurso específico del servidor o elementos específiocs aplicando un filtro del  género al que pertenecen 
// En este servidor permite obtener la información de todos los videojuegos registrados en el servidor o obtener la información de un videojuego específico 

app.get("/api/videojuegos", (req, res) => {
  const { genero } = req.query  

  if (genero) {
    // filtrado de videojuegos por género 
    const filtrados = videojuegos.filter(v => v.genero === genero)
    return res.status(200).json({ ok: true, data: filtrados })
  }

  // si no hay filtro, devolver todos
  res.status(200).json({ ok: true, data: videojuegos })
})
// Solicitud HTTP GET: Permite obtener un elemento específico de un recurso del servidor usando su ID
//En este servidor permite obtener la información de un videojuego específico previamente registrado 
app.get("/api/videojuegos/:id", (req, res) => {
  const id = req.params.id
  const videojuego = videojuegos.find(v => v.id === id)

  if (!videojuego) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  res.status(200).json({ ok: true, data: videojuego })
})

// Solicitud HTTP POST: Permite crear un nuevo elemento en el servidor
//En este servidor permite registrar la información de un videojuego nuevo 
app.post("/api/videojuegos", (req, res) => {
  const { titulo, genero, plataforma, desarrollador, año, calificacion } = req.body

  if (!titulo || !genero || !plataforma || !desarrollador || !año || !calificacion) {
    return res.status(400).json({ ok: false, error: "Faltan campos obligatorios: titulo, genero, plataforma, desarrollador, año, calificacion" })
  }

  const nuevo = {
    id: crypto.randomUUID(),
    titulo,
    genero,
    plataforma,
    desarrollador,
    año,
    calificacion
  }

  videojuegos.push(nuevo)
  res.status(201).json({ ok: true, data: nuevo })
})

// Solicitud HTTP PUT: Reemplaza toda la información de un elemento específico del servidor
// En este servidor permite actualizar toda la información registrada de un videojuego específico
app.put("/api/videojuegos/:id", (req, res) => {
  const id = req.params.id
  const index = videojuegos.findIndex(v => v.id === id)

  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  const { titulo, genero, plataforma, desarrollador, año, calificacion } = req.body

  if (!titulo || !genero || !plataforma || !desarrollador || !año || !calificacion) {
    return res.status(400).json({ ok: false, error: "Faltan campos obligatorios para reemplazar el videojuego" })
  }

  videojuegos[index] = { id, titulo, genero, plataforma, desarrollador, año, calificacion }

  res.status(200).json({ ok: true, data: videojuegos[index] })
})


// Solicitud HTTP PATCH: Modifica campos específicos de un elemento de un recurso del servidor
//En este servidor permite actualizar un campo específico de la información registrada de un videojuego específico 
app.patch("/api/videojuegos/:id", (req, res) => {
  const id = req.params.id
  const index = videojuegos.findIndex(v => v.id === id)

  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  videojuegos[index] = { ...videojuegos[index], ...req.body }

  res.status(200).json({ ok: true, data: videojuegos[index] })
})


// Solicitud HTTP DELETE: Elimina un elemento específico del servidor
// En este servidor permite eliminar toda la información registrada de un videojuego específico 
app.delete("/api/videojuegos/:id", (req, res) => {
  const id = req.params.id
  const index = videojuegos.findIndex(v => v.id === id)

  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  videojuegos.splice(index, 1)

  res.status(200).json({ ok: true, mensaje: "Videojuego eliminado correctamente" })
})

//Segundo endpoint de la API - Información general de la API
app.get("/info", (req, res) => {
  res.status(200).json({
    mensaje: "API de Videojuegos",
    curso: "Sistemas y Tecnologías Web",
    tecnologia: "Node.js + Express",
    version: "1.0.0"
  })
})


//Tercer endpoint de la API - Saludo para los usuarios 
app.get("/saludo", (req, res) => {
  res.status(200).send("Hola, mi nombre  es Julio Pellecer y esta es mi API de videojuegos")
  })


// Cuarto endpint de la API - Información del servidor 
app.get("/api/status", (req, res) => {
  res.status(200).json({
    ok: true,
    status: "online",
    puerto: PORT,
    timestamp: new Date()
  })
})


// Quinto endpoint de la API - Página HTML con información útil para el uso correcto de la API
app.get("/", (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>API de Videojuegos</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #333; color: white; padding: 10px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .get { background-color: #61affe; color: white; padding: 3px 8px; border-radius: 4px; }
        .post { background-color: #49cc90; color: white; padding: 3px 8px; border-radius: 4px; }
        .put { background-color: #fca130; color: white; padding: 3px 8px; border-radius: 4px; }
        .patch { background-color: #50e3c2; color: white; padding: 3px 8px; border-radius: 4px; }
        .delete { background-color: #f93e3e; color: white; padding: 3px 8px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>🎮 API de Videojuegos</h1>
      <p>Bienvenido, en este apartado se encuentra toda la información necesaria para poder utilizar la API de videojuegos</p>
      <table>
        <tr>
          <th>Método</th>
          <th>Ruta</th>
          <th>Descripción</th>
        </tr>
        <tr><td><span class="get">GET</span></td><td>/</td><td>Documentación de la API</td></tr>
        <tr><td><span class="get">GET</span></td><td>/info</td><td>Información general de la API</td></tr>
        <tr><td><span class="get">GET</span></td><td>/saludo</td><td>Saludo personalizado</td></tr>
        <tr><td><span class="get">GET</span></td><td>/api/status</td><td>Estado del servidor</td></tr>
        <tr><td><span class="get">GET</span></td><td>/api/videojuegos</td><td>Obtener todos los videojuegos</td></tr>
        <tr><td><span class="get">GET</span></td><td>/api/videojuegos/:id</td><td>Obtener un videojuego por ID</td></tr>
        <tr><td><span class="post">POST</span></td><td>/api/videojuegos</td><td>Crear un nuevo videojuego</td></tr>
        <tr><td><span class="put">PUT</span></td><td>/api/videojuegos/:id</td><td>Reemplazar un videojuego completo</td></tr>
        <tr><td><span class="patch">PATCH</span></td><td>/api/videojuegos/:id</td><td>Modificar campos específicos</td></tr>
        <tr><td><span class="delete">DELETE</span></td><td>/api/videojuegos/:id</td><td>Eliminar un videojuego</td></tr>
      </table>
    </body>
    </html>
  `)
})

//Sexto endpoint de la API - Control de solicitudes a recursos no existentes en el servidor 
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `La ruta ${req.originalUrl} no existe en este servidor.`
    });
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`)
})
