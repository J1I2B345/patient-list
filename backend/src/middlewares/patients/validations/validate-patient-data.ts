import { check } from 'express-validator';

import patientService from '../../../services/patients';

const validateEmail = check('email', 'Email is required')
  .isEmail()
  .normalizeEmail()
  .isLength({ min: 12, max: 100 })
  .withMessage('Email must be between 12 and 100 characters')
  .custom((value) => {
    const isGmail = value?.split('@')?.[1] === 'gmail.com';
    if (!isGmail) {
      throw new Error('Only gmail accounts are allowed');
    }
    return true;
  });

const validateName = check('name', 'Name is required')
  .trim()
  .escape()
  .isString()
  .isLength({ min: 2, max: 50 })
  .withMessage('Name must be between 2 and 50 characters');

const validatePhoneNumber = check('phoneNumber', 'Phone number is required')
  .trim()
  .escape()
  .isString()
  .isLength({
    min: 5,
    max: 20,
  })
  .withMessage('Phone number must be between 5 and 20 characters')
  .isMobilePhone('any')
  .withMessage('Phone number should respect format e.g 5491122334455 ');

const validateEmailIsUnique = check('email')
  .normalizeEmail()
  .custom(async (value) => {
    const isEmailAlreadyTaken = await patientService.getByEmail(value);
    if (isEmailAlreadyTaken) {
      throw new Error('Email already taken');
    }
  });

export default [
  validateEmail,
  validateName,
  validatePhoneNumber,
  validateEmailIsUnique,
];
