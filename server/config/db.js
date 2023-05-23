const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_QUERIES}`;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connection established');

    connection.connection.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
