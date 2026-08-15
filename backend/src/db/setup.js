const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
require('dotenv').config();

console.log('Step 1: Starting setup script');

const dbPath = process.env.DB_PATH || './data/insurance_claims_checker.sqlite';
const dataDir = path.dirname(dbPath);

console.log('Step 2: DB path resolved to', path.resolve(dbPath));

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Step 3: Created data directory', dataDir);
} else {
  console.log('Step 3: Data directory already exists', dataDir);
}

try {
  const db = new DatabaseSync(path.resolve(dbPath));
  console.log('Step 4: Database connection opened');

  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  console.log('Step 5: Schema file read, length =', schema.length);

  db.exec(schema);
  console.log('Step 6: Schema executed');

  const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  console.log('Step 7: Seed file read, length =', seed.length);

  db.exec(seed);
  console.log('Step 8: Seed executed');

  const rows = db.prepare('SELECT policy_id FROM policies').all();
  console.log('Step 9: Seeded policies:', rows);

  db.close();
  console.log('Step 10: Database closed. Setup complete.');
} catch (err) {
  console.error('ERROR during DB setup:', err);
  process.exitCode = 1;
}