// On récupère le Client de pg
const { Client } = require('pg');

// On créer un nouveau client,
// il n'y a pas besoin de lui spécifier les infos du .env car il va les chercher directement

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
});

// On connecte le client
client.connect();

// On exporte le client
module.exports = client;
