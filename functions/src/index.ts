import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const key = require('../privateKey.json');

admin.initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: "https://modulo-horario.firebaseio.com"
});

// ?Obtener Todas las Materias
// ?Obtener Las materias de la Carrera
// ?Obtener Una materia por Carrera e ID
export const getMaterias = functions.https.onRequest((request, response) => {

  const carrera = request.query.carrera;   // ?Query de la Carrera 
  const materiaID = request.query.materia; // ?Query de la Materia
  if (request.method === 'GET') {
    if (!carrera && !materiaID){
      const materias = admin.database().ref('/materias/');
      materias.on('value', (snapshot) => response.status(200).json(snapshot).send('Hecho'));
    } else if (!materiaID) {
      const materias = admin.database().ref(`/materias/${carrera}`);
      materias.on('value', (snapshot) => response.status(200).json(snapshot).send('Hecho'));
    } else {
      const materias = admin.database().ref(`/materias/${carrera}/${materiaID}`);
      materias.on('value', (snapshot) => response.status(200).json(snapshot).send('Hecho'));
    }
  }
});

// ?Agregar Materia por Carrera e ID
export const addMateriaID = functions.https.onRequest((request, response) => {

  if (request.method === 'POST') {
    const carrera = request.query.carrera;
    const materiaID = request.query.materiaID;
    const materia = admin.database().ref(`/materias/${carrera}/${materiaID}`);
    const addMateria = request.body;
    materia.set(addMateria)
      .then((data) => response.status(201).send(materiaID + 'Creada en: ' + carrera))
      .catch((error) => response.status(500).send(error));

  }
});


/*
// ?Obtener Todos los Profesores
export const getProfesores = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// ?Obtener el Horario
export const getHorario = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
}); */
