import multer from 'multer';

// Configure Multer to save files in memory (Buffer)
export const multerMiddleware = multer({
  storage: multer.memoryStorage(), // Save the file in memory for processing
}).single('file');
