import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { storageService } from '../services/storage';

export const uploadPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new BadRequestError('No file uploaded.');
    }

    if (req.file.mimetype !== 'image/jpeg') {
      throw new BadRequestError(
        'File uploaded should be an image and JPG format.'
      );
    }

    const urlFile = await storageService.uploadFile(
      req.file as Express.Multer.File
    );
    if (!urlFile) {
      throw new BadRequestError('Error uploading file.');
    }
    req.body = { ...req.body, photoUrl: urlFile };
    console.log('File uploaded', urlFile);
    next();
  } catch (error) {
    next(error);
  }
};
