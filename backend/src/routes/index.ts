import express from 'express';
import patientsRouter from './patients';

const router = express.Router();

router.use('/patients', patientsRouter);

export default router;
