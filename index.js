const express = require('express')
const servidor = express()
const port = 3000

// middlewares
servidor.use(express.json())


function RecibirPeticion(request, response ,next){
  console.log("Esta llegando una peticion!!!!")
  next()
} 
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





