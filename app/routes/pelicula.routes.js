module.exports = app => {
  //busca el controlador para enlazar los metodos
  const peliculas = require("../controllers/pelicula.controller.js");
  
  var router = require("express").Router();
  
  // crear una nueva pelicula
  router.post("/", peliculas.create);
    
  // Mostrar las todas las peliculas
  router.get("/", peliculas.findAll);

  // Mostrar peliculas publicadas
  router.get("/published", peliculas.findAllPublished);

  // Mostrar peliculas por id
  router.get("/:id", peliculas.findOne);

  // Actualizar pelicula con el id
   router.put("/:id", peliculas.update);

  // Eliminar pelicula con el id
  router.delete("/:id", peliculas.delete);

  // Eliminar todas las peliculas 
  router.delete("/", peliculas.deleteAll);

  // Ruta predeterminar para enviar las peticiones
    app.use("/api/peliculas", router);
  };
  