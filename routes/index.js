const { Router } = require("express");
const router = Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Ruta simple
router.get("/", (req, res) => {
  res.send("Bienvenido al servidor");
});

// Ruta de prueba GET
router.get("/rutaGet", (req, res) => {
  res.send("Hola haciendo pruebas con la ruta GET");
});

// Ruta de prueba GET JSON
router.get("/rutaGetJSON", (req, res) => {
  res.json({ mensaje: "Hola con JSON" });
});

// Ruta POST de prueba
router.post("/rutaPOST", (req, res) => {
  console.log(req.body);
  res.send("Datos recibidos");
});

// Ruta de prueba POST (verifica que está activa desde Postman)
router.post("/test", (req, res) => {
  res.json({ message: "La ruta /test funciona" });
});

// Ruta POST con IA
router.post("/IAChat", async (req, res) => {
  const pregunta = req.body.pregunta;
  const role = "asistente virtual";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `Eres un ${role}` },
        { role: "user", content: pregunta },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const result = response.data.choices[0].message.content;
    res.json({ content: result });
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
