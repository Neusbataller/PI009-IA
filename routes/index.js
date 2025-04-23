const { Router } = require("express");
const router = Router();
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/rutaPost_IA", async (req, res) => {
  const pregunta = req.body.pregunta;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un ordenador malote",
        },
        {
          role: "user",
          content: pregunta,
        },
      ],
    });

    const respuesta = completion.choices[0].message.content;

    res.json({ content: respuesta });
  } catch (error) {
    console.error("Error en OpenAI:", error.message);
    res.status(500).json({ content: "Error al procesar la solicitud de IA." });
  }
});

module.exports = router;

// const { Router } = require("express");
// const router = Router();
// const OpenAI = require("openai");
// require("dotenv").config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// router.post("/rutaPost_IA", (req, res) => {
//   const completion = openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     store: true,
//     messages: [
//       {
//         role: "developer",
//         content: "Eres un ordenador malote" + req.body.pregunta,
//       },
//     ],
//   });
//   completion.then((result) => {
//     res.send(result.choices[0]);
//   });
// });

// module.exports = router;

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
