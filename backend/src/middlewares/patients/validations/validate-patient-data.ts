import { check } from 'express-validator';

import patientService from '../../../services/patients';

const validateEmail = check('email', 'Email is required')
  .isEmail()
  .normalizeEmail()
  .isLength({ max: 100 })
  .withMessage('Email must be less than 100 characters')
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
  .isLength({ max: 50 })
  .withMessage('Name must be less than 50 characters');

const validateCountryCode = check('countryCode', 'Country code is required')
  .trim()
  .escape()
  .isString()
  .isLength({
    max: 5,
  })
  .withMessage('Phone number must be less than 20 characters');

const validatePhoneNumber = check('phoneNumber', 'Phone number is required')
  .trim()
  .escape()
  .isString()
  .isLength({
    max: 20,
  })
  .withMessage('Phone number must be less than 20 characters')
  .custom((value) => Number(value))
  .withMessage('Phone number should contain only numbes');

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
  validateCountryCode,
  validatePhoneNumber,
  validateEmailIsUnique,
];
