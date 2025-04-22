const { Router } = require("express");
const router = Router();
const OpenAI = require("openai");

router.post("/rutaPost_IA", (req, res) => {
  require("dotenv").config();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "developer",
        content: "Eres un ordenador malote" + req.body.pregunta,
      },
    ],
  });
  completion.then((result) => {
    res.send(result.choices[0]);
  });
});

module.exports = router;

// const { Router } = require("express");
// const router = Router();

// //Rutas Get
// router.get("/", (req, res) => {
//   console.log("Alguien ha accedido al servidor ");
//   res.send("Bienvenido al servidor ");
// });

// router.get("/rutaGet", (req, res) => {
//   console.log("Alguien ha accedido a la ruta get ");
//   res.send("hola haciendo pruebas con la ruta get ");
// });
// router.get("/rutaGetJSON", (req, res) => {
//   console.log("Alguien ha accedido a la ruta get con un JSON ");
//   res.send("hola haciendo pruebas con la ruta getJSON ");
// });

// router.post("/rutaPOST", (req, res) => {
//   console.log("Alguien ha accededido a la ruta POST");
//   console.log(req.body);
//   res.send("Datos recibidos");
// });

// router.post("/rutaPOSTconBody", (req, res) => {
//   console.log(req.body);
//   res.send("Info recibida");
// });

// module.exports = router;
