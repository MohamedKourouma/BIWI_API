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


/*persons pages. */

router.post('/persons', createPerson);
router.get('/persons', getAllPersons);
router.get('/persons/:id', getSinglePerson);
router.put('/persons/:id', updatePerson);
router.delete('/persons/:id', removePerson);

/*persons pages. */

router.post('/checkpoints', createCheckpoint);
router.get('/checkpoints', getAllCheckpoints);
router.get('/checkpoints/:id', getSingleCheckpoint);
router.put('/checkpoints/:id', updateCheckpoint);
router.delete('/checkpoints/:id', removeCheckpoint);


/* places page. */

router.post('/places', createPlace);
router.get('/places', getAllPlaces);
router.get('/places/:id', getSinglePlace);
router.put('/places/:id', updatePlace);
router.delete('/places/:id', removePlace);



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
  //console.log(connectionString);

  const cn = pgp(connectionString);

  return cn;

}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

/* PERSONS CRUD */

function getAllPersons(req, res, next) {
  //console.log("Personnes");
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
      })
      .finally(cn.$pool.end);
}

function getSinglePerson(req, res, next) {
    var persID = parseInt(req.params.id);
    const cn = connect();
    cn.one('select * from person where person_id = $1', persID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE person'
                });
            console.log(data);
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}


function createPerson(req, res, next) {
    console.log("Person to create : ");
    console.log(req.body);

    const firstname = req.body.person_first_name;
    const lastname = req.body.person_last_name;
    const mail = req.body.person_mail;
    const phone = req.body.person_phone;


    const cn = connect();
    cn.none('insert into person(person_first_name, person_last_name, person_mail, person_phone, person_id_position)' +
        'values( $1, $2, $3, $4, 1)',
        [firstname, lastname, mail, phone])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one person'
                });
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);

}


function updatePerson(req, res, next) {

    const cn = connect();
    cn.none('update person set person_first_name=$1, person_last_name=$2, person_mail=$3, person_phone=$4 where person_id=$5',
        [req.body.person_first_name, req.body.person_last_name,
            req.body.person_mail, req.body.person_phone, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated person'
                });
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}

function removePerson (req, res, next) {
    const persId = parseInt(req.params.id);
    const cn = connect();
    cn.result('delete from person where person_id = $1', persId)
        .then((results) => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Person with ID = ${persId} successfully deleted.`
                });
        })
        .catch((err) => next(err))
        .finally(cn.$pool.end);
}



/* PLACES CRUD */

function getAllPlaces(req, res, next) {
    //console.log("Places");
    const cn = connect();
    cn.any('select * from place', [(true)])
        .then(function (data) {

            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL places'
                });
            console.log(data);
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}

function getSinglePlace(req, res, next) {
    var persID = parseInt(req.params.id);
    const cn = connect();
    cn.one('select * from place where place_id = $1', persID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE place'
                });
            console.log(data);
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}


function createPlace(req, res, next) {
    const lib = req.body.place_lib;

    const cn = connect();
    cn.none('insert into place(place_lib)' +
        'values($1)', lib)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one place'
                });
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}


function updatePlace(req, res, next) {

    const cn = connect();
    cn.none('update place set place_lib=$1 where place_id=$2',
        [req.body.place_lib, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated place'
                });
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}

function removePlace (req, res, next) {
    const persId = parseInt(req.params.id);
    const cn = connect();
    cn.result('delete from place where place_id = $1', persId)
        .then((results) => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Place with ID = ${persId} successfully deleted.`
                });
        })
        .catch((err) => next(err))
        .finally(cn.$pool.end);
}


/* CHECKPOINTS CRUD */

function getAllCheckpoints(req, res, next) {
    //console.log("Checkpoints");
    const cn = connect();
    cn.any('select * from checkpoint', [(true)])
        .then(function (data) {

            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL checkpoints'
                });
            console.log(data);
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}

function getSingleCheckpoint(req, res, next) {
    var cpID = parseInt(req.params.id);
    const cn = connect();
    cn.one('select * from checkpoint where checkpoint_id = $1', cpID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE checkpoint'
                });
            console.log(data);
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}


function createCheckpoint(req, res, next) {

    const descript = req.body.checkpoint_description;
    const start_date = req.body.checkpoint_start_date;
    const end_date = req.body.checkpoint_end_date;


    const cn = connect();
    cn.none('insert into checkpoint(checkpoint_id_place, checkpoint_description, checkpoint_start_date, checkpoint_end_date)' +
        'values(1, $1, $2, $3)',
        [descript, start_date, end_date])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one checkpoint'
                });
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}


function updateCheckpoint(req, res, next) {

    const cn = connect();
    cn.none('update checkpoint set checkpoint_description=$1, checkpoint_start_date=$2, checkpoint_end_date=$3 where checkpoint_id=$4',
        [req.body.checkpoint_description, req.body.checkpoint_start_date,
            req.body.checkpoint_end_date, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated checkpoint'
                });
        })
        .catch(function (err) {
            return next(err);
        })
        .finally(cn.$pool.end);
}

function removeCheckpoint (req, res, next) {
    const cpId = parseInt(req.params.id);
    const cn = connect();
    cn.result('delete from checkpoint where checkpoint_id = $1', cpId)
        .then((results) => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Checkpoint with ID = ${cpId} successfully deleted.`
                });
        })
        .catch((err) => next(err))
        .finally(cn.$pool.end);
}



