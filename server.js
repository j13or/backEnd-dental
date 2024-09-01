import 'dotenv/config';
import { db } from './config/db.config.js';
import { app } from './app.js';
import { initModel } from './models/initModels.js';

const port = process.env.PORT || 3032;

initModel();
db.authenticate()
  .then(() => {
    return db.sync();
  })
  .then(() => {
    console.log(`Database Synced 👊`);
    app.listen(port, () => {
      console.log(`App Running on Port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the data 💀`, err);
  });
