const express = require('express')
const servidor = express()
const port = 3000

// middlewares


function RecibirPeticion(request, response ,next){
  const ruta = request.url
  console.log("Esta llegando una peticion a la ruta: ", ruta)
  next()
} 

function contentTypeMiddleware(request, response,next ){
  const headers = request.headers
  const contentType = headers["content-type"]
  if (contentType === "application/json" || contentType === "text/plain" ){
    next()
  }
  else{
    response.sendStatus(415)
  }
}

function authorizationMiddleware(request, response, next){
  const password = "1234"
  const headers = request.headers
  const authorization = headers["authorization"]
  console.log(authorization)
  console.log(headers)
  if (authorization == undefined){
    response.sendStatus(401)
  }
  if (authorization != password){
    response.status(401).send("Contraseña incorrecta!!!")
  }
  next()
}


servidor.use(authorizationMiddleware)
servidor.use(contentTypeMiddleware)
servidor.use(express.json())
servidor.use(RecibirPeticion)


//rutas
function getEnRaiz(request , response){
  console.log("llego una peticion get a la raiz!!")
  response.send("Bienvenido a mi servidor de programacion redes!!")
}
servidor.get("/", getEnRaiz)

function postEnRaiz(request, response){
  console.log(request.body)
  console.log("Recibiendo un post en la raiz")
  response.status(201).send("Post Recibido!!")
}
servidor.post("/", postEnRaiz)

const estudiantes = ["juan", "camila", "pedro", "pepe"]
function listadoDeEstudiantes(request, response){
  response.json(estudiantes)
}
servidor.get("/estudiantes",listadoDeEstudiantes)

function crearEstudiante(request, response){
  const body = request.body
  const nombre = body.nombre_del_estudiante
  estudiantes.push(nombre)
  response.sendStatus(201)
}
servidor.post("/estudiantes", crearEstudiante)
//inicializacion
function iniciarServidor(){
  console.log("Hola mundo!!!")
}
servidor.listen(port, iniciarServidor)





