import { addDataToFile } from '../ia/chatBot.js';
import { getResponse } from '../ia/chatBot.js'; // Asegúrate de importar getResponse si está en otro archivo

export const chatIa = async (req, res, next) => {
  try {
    // Obtener el texto del cuerpo de la solicitud
    const { text } = req.body;

    // Validar que se ha recibido texto
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Obtener respuesta del chatbot
    const responseText = getResponse(text);

    // Enviar respuesta al cliente
    res.json({ response: responseText });
  } catch (error) {
    next(error);
  }
};

// Controlador para agregar datos
export const addDataIa = async (req, res, next) => {
  try {
    const { input, output } = req.body;

    // Validar que se han recibido los datos necesarios
    if (!input || !output) {
      return res.status(400).json({ error: 'Input and output are required' });
    }

    const newEntry = {
      input: input.toLowerCase().trim(),
      output: output.toLowerCase().trim(),
    };

    // Llamar a addDataToFile y manejar cualquier error potencial
    try {
      addDataToFile(newEntry);
      return res.json({ message: 'Datos agregados exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al agregar datos' });
    }
  } catch (error) {
    next(error);
  }
};
