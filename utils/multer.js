import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtener el directorio actual
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename(req, file, callback) {
    const extension = path.extname(file.originalname);
    const originalName = file.originalname.split(extension)[0];
    const cleanedName = originalName.replace(/\s+/g, '-').toLowerCase();
    const filename = `${cleanedName}-${Date.now()}${extension}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

export { upload };
