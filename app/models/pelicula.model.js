module.exports = mongoose => {

  // Como se reciben los datos, definir las variables
  var schema = mongoose.Schema(
    {
      titulo: String,
      descripcion: String,
      genero: String,
      publicado: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pelicula = mongoose.model("pelicula", schema);
  return Pelicula;
};