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

// Solicitud HTTP GET: Permite obtener todos los elementos de un recurso específico del servidor
app.get("/api/videojuegos", (req, res) => {
  res.status(200).json({ ok: true, data: videojuegos })
})

// Solicitud HTTP GET: Permite obtener un elemento específico de un recurso del servidor usando su ID
app.get("/api/videojuegos/:id", (req, res) => {
  const id = req.params.id
  const videojuego = videojuegos.find(v => v.id === id)

  if (!videojuego) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  res.status(200).json({ ok: true, data: videojuego })
})

// Solicitud HTTP POST: Permite crear un nuevo elemento en el servidor
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
app.delete("/api/videojuegos/:id", (req, res) => {
  const id = req.params.id
  const index = videojuegos.findIndex(v => v.id === id)

  if (index === -1) {
    return res.status(404).json({ ok: false, error: "Videojuego no encontrado" })
  }

  videojuegos.splice(index, 1)

  res.status(200).json({ ok: true, mensaje: "Videojuego eliminado correctamente" })
})


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`)
})
