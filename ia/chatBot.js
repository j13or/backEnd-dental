import fs from 'fs';
import path from 'path';
import readline from 'readline';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import Fuse from 'fuse.js';

// Define la ruta al archivo JSON
const filePath = path.resolve('ia', 'data.json');

// Inicializa los datos de entrenamiento
let trainingData = [];

// Configuración del agente HTTPS para ignorar la verificación del certificado
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Cargar datos de entrenamiento desde el archivo JSON
const loadTrainingData = () => {
  try {
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(rawData);
      trainingData = data?.map((item) => ({
        category: item.category?.toLowerCase().trim(),
        input: item.input?.toLowerCase().trim(),
        output: item.output?.toLowerCase().trim(),
      }));
    } else {
      console.warn(
        'El archivo JSON no existe, se creará uno nuevo cuando se agreguen datos.'
      );
    }
  } catch (error) {
    console.error('Error al leer o procesar el archivo JSON:', error);
    process.exit(1);
  }
};

loadTrainingData(); // Cargar datos al iniciar el programa

const fuseOptions = {
  includeScore: true,
  threshold: 0.3,
  keys: ['input'],
};

const getResponseByCategory = (input, category) => {
  const normalizedInput = input.toLowerCase().trim();

  const filteredData = trainingData.filter(
    (item) => item.category === category
  );
  const fuse = new Fuse(filteredData, fuseOptions);
  const result = fuse.search(normalizedInput);

  if (result.length > 0) {
    return result[0].item.output;
  }

  return 'Lo siento, no entiendo eso.';
};

// Función para obtener una respuesta general
export const getResponse = (input) => {
  const response = getResponseByCategory(input, 'dental');
  if (response !== 'Lo siento, no entiendo eso.') {
    return response;
  }

  return getResponseByCategory(input, 'general');
};

// Función de prueba en consola
export const chatConsole = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Chatbot: ¡Hola! Escribe 'adiós' para salir.");

  rl.on('line', (input) => {
    if (input.toLowerCase() === 'adiós') {
      console.log('Chatbot: ¡Adiós!');
      rl.close();
    } else {
      console.log(`Chatbot: ${getResponse(input)}`);
    }
  });
};

// Función para agregar datos al archivo JSON
export const addDataToFile = (newEntry) => {
  if (
    !newEntry ||
    typeof newEntry.category !== 'string' ||
    typeof newEntry.input !== 'string' ||
    typeof newEntry.output !== 'string'
  ) {
    console.error(
      'El nuevo dato debe ser un objeto con propiedades `category`, `input`, y `output` como cadenas de texto.'
    );
    return;
  }

  try {
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(rawData);
    }

    existingData.push({
      category: newEntry.category.toLowerCase().trim(),
      input: newEntry.input.toLowerCase().trim(),
      output: newEntry.output.toLowerCase().trim(),
    });

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    trainingData.push({
      category: newEntry.category.toLowerCase().trim(),
      input: newEntry.input.toLowerCase().trim(),
      output: newEntry.output.toLowerCase().trim(),
    });
  } catch (error) {
    console.error('Error al escribir el archivo JSON:', error);
  }
};

// Función de scraping de datos
export const scrapeData = async () => {
  const url = 'https://www.clinicadentalochogavia.es/consultas-odontologicas/';

  try {
    const { data } = await axios.get(url, { httpsAgent: agent });
    const $ = cheerio.load(data);

    $('.vc_toggle').each((i, element) => {
      const question = $(element).find('.vc_toggle_title h4').text().trim();
      const answer = $(element)
        .find('.vc_toggle_content p')
        .map((_, p) => $(p).text().trim())
        .get()
        .join(' ');

      if (question && answer) {
        const category = 'dental';
        const input = question;
        const output = answer;

        const newEntry = { category, input, output };
        addDataToFile(newEntry);
      }
    });

    console.log('Datos raspados y agregados con éxito.');
  } catch (error) {
    console.error('Error al raspar datos:', error);
  }
};
