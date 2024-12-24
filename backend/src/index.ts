import { app } from './app';
import { sequelize } from './config/database';
import { initializeFirebaseAdmin } from './config/firebase';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { FirebaseConnectionError } from './errors/firebase-connection-error';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    try {
      await sequelize.sync({
        force: process.env.NODE_ENV === 'development' ? true : false,
      }); // `force: true` drops tables on restart
      console.log(
        'Connection with Database has been established successfully.'
      );
    } catch (error) {
      throw new DatabaseConnectionError();
    }

    try {
      initializeFirebaseAdmin();
      console.log(
        'Connection with Firebase has been established successfully.'
      );
    } catch (error: any) {
      console.log('Firebase admin initialization error', error.stack);
      throw new FirebaseConnectionError();
    }

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to initialize server', error);
  }
};

start();
