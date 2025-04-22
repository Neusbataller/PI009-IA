const { Router } = require("express");
const router = Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

router.post("/IAChat", async (req, res) => {
  const pregunta = req.body.pregunta;

  if (!pregunta) {
    return res
      .status(400)
      .json({ content: "Falta la pregunta en la solicitud." });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un asistente virtual" },
        { role: "user", content: pregunta },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const result = response.data.choices[0].message.content;
    res.json({ content: result }); // <- ESTO ES LO QUE UNITY NECESITA
  } catch (error) {
    console.error(error);
    res.status(500).json({ content: "Error al procesar la solicitud." });
  }
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
