const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//application/json, recibir json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//conexion con la base de datos de mongodb
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conexion con la base de datos!");
  })
  .catch(err => {
    console.log("No se puede conectar con la base de datos!", err);
    process.exit();
  });

// mensaje de inicio de la api
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido al Rest API" });
});

require("./app/routes/pelicula.routes")(app);

// muestra el puerto al que se inicio el servicio
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servicio iniciado en el puerto: ${PORT}.`);
});
