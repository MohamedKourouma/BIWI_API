const express = require('express');
const router = express.Router();

//var queries = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

/*
module.exports = {
  createPerson: createPerson,
  getAllPersons: getAllPersons,
  getSinglePerson: getSinglePerson,
  updatePerson: updatePerson,
  removePerson: removePerson
};
*/

//function createPerson(req, res, next) {};
//function getAllPersons(req, res, next) {};
//function getSinglePerson(req, res, next){};
//function updatePerson(req, res, next) {};
//function removePerson(req, res, next) {};

/*persons pages. */

//router.post('/api/persons', queries.createPerson);
router.get('/persons', getAllPersons);
//router.get('/api/persons/:id', queries.getSinglePerson);
//router.put('/api/persons/:id', queries.updatePerson);
//router.delete('/api/persons/:id', queries.removePerson);


/* places page.

router.post('/api/places', queries.createPlace);
router.get('/api/places', queries.getAllPlaces);
router.get('/api/places/:id', queries.getSinglePlace);
router.put('/api/places/:id', queries.updatePlace);
router.delete('/api/places/:id', queries.removePlace);

*/

function connect(){

  const initOptions = {
    schema: 'public'
  };
  const pgp = require('pg-promise')(initOptions);


//var {dbconfig} = require('./../config/dbConfig');

  const dbconfig =
      {
        host: 'ec2-54-228-252-67.eu-west-1.compute.amazonaws.com',
        database: 'dbnnftuqdohm1v',
        user: 'tfrieerfftsnhh',
        port: 5432,
        password: 'fc3f34cad9dc486ee12dae073396bcdd394ec341ea4ca14269dd623563e46ee4',
        dialect: 'postgres'
      };


  var db = {
    database: dbconfig.database,
    username: dbconfig.user,
    password: dbconfig.password,
    host: dbconfig.host,
    port: dbconfig.port,
    dialect: dbconfig.dialect
  };

  const connectionString = db.dialect + "://" + db.username+ ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.database + "?ssl=true";
  console.log(connectionString);

  const cn = pgp(connectionString);

  return cn;

}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;



function getAllPersons(req, res, next) {
  console.log("Personnes");
  const cn = connect();
  cn.any('select * from person', [(true)])
      .then(function (data) {

        res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'Retrieved ALL persons'
            });
        console.log(data);
      })
      .catch(function (err) {
        return next(err);
      });
}


