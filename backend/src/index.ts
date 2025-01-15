import { app } from './app';
import { sequelize } from './config/database';
import { initializeFirebaseAdmin } from './config/firebase';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { FirebaseConnectionError } from './errors/firebase-connection-error';
import { logError, logInfo } from './utils/logger';

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    try {
      await sequelize.sync({
        force: process.env.NODE_ENV === 'development' ? true : false,
      }); // `force: true` drops tables on restart
      logInfo('Database connection established', {
        message: 'Connection with Database has been established successfully.',
      });
    } catch (error) {
      logError('Database connection error', { error: error });
      throw new DatabaseConnectionError();
    }

    try {
      initializeFirebaseAdmin();
      logInfo('Firebase connection established', {
        message: 'Connection with Firebase has been established successfully.',
      });
    } catch (error) {
      logError('Firebase admin initialization error', { error: error });
      throw new FirebaseConnectionError();
    }

    app.listen(PORT, () => {
      logInfo('Server is running', {
        message: `Server is running at http://localhost:${PORT}`,
      });
    });
  } catch (error) {
    logError('Unable to initialize server', { error: error });
  }
};

start();
