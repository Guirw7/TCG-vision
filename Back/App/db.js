// On récupère le Client de pg
const { Client } = require('pg');

// On créer un nouveau client,
// il n'y a pas besoin de lui spécifier les infos du .env car il va les chercher directement
const client = new Client();

// On connecte le client
client.connect();

// On exporte le client
module.exports = client;
