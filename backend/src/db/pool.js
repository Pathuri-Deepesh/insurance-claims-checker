const { DatabaseSync } = require('node:sqlite');
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_PATH || './data/insurance_claims_checker.sqlite';
const resolvedPath = path.resolve(dbPath);

const db = new DatabaseSync(resolvedPath);

module.exports = db;