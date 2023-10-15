const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'albertr',
  host: 'localhost',
  database: 'dbadsum',
  password: 'testadsum01',
  port: 5432,
});

app.use(bodyParser.json());

app.post('/guardar-datos', (req, res) => {
  const { nombreCompleto, nombreEmpresa, correo, telefono, categoria, mensaje } = req.body;

  const query = 'INSERT INTO datos (nombre_completo, nombre_empresa, correo, telefono, categoria, mensaje) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [nombreCompleto, nombreEmpresa, correo, telefono, categoria, mensaje];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al guardar los datos' });
    } else {
      res.status(201).json({ message: 'Datos guardados correctamente' });
    }
  });
});

app.listen(port, () => {
  console.log(`API en ejecución en http://localhost:${port}`);
});
