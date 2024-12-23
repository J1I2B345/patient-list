import { Sequelize } from 'sequelize-typescript';
import { Patient } from '../database/models/Patient';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

export const sequelize = new Sequelize({
  dialect: 'mysql', // Change to your database (e.g., postgres, sqlite)
  host: MYSQL_HOST,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  models: [Patient], // Register models here
  logging: console.log, // Set to true for detailed SQL logs
});
