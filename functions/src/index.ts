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
    if (!carrera && !materiaID) {
      const materias = admin.database().ref('/materias/');
      materias.on('value', (snapshot) => response.status(200).json(snapshot).send('Hecho'));
    } else if (!materiaID) {
      const materias = admin.database().ref(`/materias/${carrera}`);
      materias.on('value', (snapshot) => {
        // tslint:disable-next-line: no-unnecessary-type-assertion
        const datos = snapshot!.exists()
        if (datos) {
          response.status(200).json(snapshot).send('Hecho');
        } else {
          response.status(404)
            .send('Carrera inexistente, por favor rectifique sus datos\n\n' +
              '1115: Arquitectura\n1413: Administración de Empresas\n1715: Psicología\n1720: Ingeniería de Sistemas');
        }
      });
    } else {
      const materias = admin.database().ref(`/materias/${carrera}/${materiaID}`);
      materias.on('value', (snapshot) => {
        // tslint:disable-next-line: no-unnecessary-type-assertion
        const datos = snapshot!.exists()
        if (datos) {
          response.status(200).json(snapshot).send('Hecho');
        } else {
          response.status(404).send('Materia Inexistente. Rectifique el ID de la materia, por favor');
        }
      });
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

// ?Agregar Materia por Carrera e ID
export const updateMateriaID = functions.https.onRequest((request, response) => {

  if (request.method === 'PUT') {
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

export const registrarProfesor = functions.auth.user().onCreate((user) => {
  admin.database().ref(`/profesores/${user.uid}`)
    .set({
      email: user.email,
      nombre: '',
      apellido: '',
      disponible: true,
      ID: user.uid
    })
    .then(() => console.log('Profesor: ' + user.uid + ' creado'))
    .catch((err) => console.log('Error: ' + err));
});
