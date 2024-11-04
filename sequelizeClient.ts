import { Sequelize } from 'sequelize';

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to SQLite file
  logging: false, // Set to true to see SQL logs
});

export default sequelize;
