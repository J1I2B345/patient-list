import { isMobilePhone } from "validator";

export const validateMobilePhone = (value:string)=> isMobilePhone(value.replace('+', ''))


export function validateGmail(email: string): {
    isValidEmail: boolean;
    isGmail: boolean;
  } {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const isValidEmail = emailRegex.test(email);
  
    const isGmail = isValidEmail && email.endsWith('@gmail.com');
    return { isValidEmail, isGmail };
  }