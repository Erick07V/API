const db = require("../models");
const Pelicula = db.peliculas;

// Crear y guardar pelicula
exports.create = (req, res) => {
  // Validar que esta pasando el dato
  if (!req.body.titulo) {
    res.status(400).send({ message: "No se puede estar vacio el campo!" });
    return;
  }
  // Constructor de la pelicula
  const pelicula = new Pelicula({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    genero: req.body.genero,
    publicado: req.body.publicado ? req.body.publicado : false
  });

  // Guardar en base de datos
  pelicula
    .save(pelicula)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al intentar guardar en base de datos."
      });
    });
};

//Mostrar las peliculas
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i" } } : {};

  Pelicula.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al intentar buscar las peliculas."
      });
    });
};

// Buscar una pelicula con el id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Pelicula.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se encontro la pelicula del id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al buscar la pelicula con el id=" + id });
    });
};

//Actualizar pelicula con el id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "El campo no puede estar vacio!"
    });
  }

  const id = req.params.id;

  Pelicula.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar la pelicula con el id=${id}`
        });
      } else res.send({ message: "Se actualizo la pelicula" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar actualizar la pelicula con el id=" + id
      });
    });
};

//Eliminar pelicula por id
exports.delete = (req, res) => {
  const id = req.params.id;
  Pelicula.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar la pelicula con el id=${id}`
        });
      } else {
        res.send({
          message: `Se elimino la pelicula con el id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la pelicula con el id=" + id
      });
    });
};

//Eliminar todas las peliculas de la base de datos
exports.deleteAll = (req, res) => {
  Pelicula.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Las peliculas se eliminaron!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al intentar eliminar todas las peliuclas"
      });
    });
};

// Buscar peliculas publicadas
exports.findAllPublished = (req, res) => {
  Pelicula.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al mostrar las peliculas publicadas"
      });
    });
};