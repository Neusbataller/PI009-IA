require("dotenv").config();

const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

router.post("/IAChat", async (req, res) => {
  const pregunta = req.body.pregunta;
  const role = "asistente virtual";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

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

// const express = require("express");
// const app = express();
// const morgan = require("morgan");

// //Settings
// app.set("port", process.env.PORT || 8080);

// //Middleware
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// //Rutas
// app.use(require("./routes/index"));

// //Iniciando el servidor
// app.listen(app.get("port"), () => {
//   console.log("hola desde el puerto: " + app.get("port"));
// });
