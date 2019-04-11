const express = require('express');
const router = express.Router();
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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;


const connectionString = db.dialect + "://" + db.username+ ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.database + "?ssl=true";
console.log(connectionString);

var cn = pgp(connectionString);

/*
cn.any("SELECT * from person ", [(true)])
    .then(function (data) {
      console.log("DATA:", data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
*/


function getAllPersons(req, res, next) {
    cn.any('select * from person')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL persons'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSinglePerson(req, res, next) {
    var persID = parseInt(req.params.id);
    cn.one('select * from person where person_id = $1', persID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE person'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function createPerson(req, res, next) {
    req.body.age = parseInt(req.body.age);
    cn.none('insert into person(person_first_name, person_last_name)' +
        'values(${firstname}, ${lastname})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function updatePerson(req, res, next) {
    cn.none('update person set person_first_name=$1, person_last_name=$2',
        [req.body.name, req.body.breed, parseInt(req.body.age),
            req.body.sex, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

