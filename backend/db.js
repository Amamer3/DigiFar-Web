// Importing necessary modules
import pg from 'pg'; // Use the default import for pg
const { Pool } = pg; // Destructure to get the Pool class
import dotenv from 'dotenv'; // Import dotenv to load environment variables

// Load environment variables from a .env file into process.env
dotenv.config();

// Check for required environment variables
if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Missing required database environment variables');
}

// Create a pool of connections for better performance
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export the pool for use in other files
export default pool;
