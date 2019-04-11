const express = require("express");
var router = express.Router();

const dbconfig =
        {
            host: 'ec2-54-228-252-67.eu-west-1.compute.amazonaws.com',
            database: 'dbnnftuqdohm1v',
            user: 'tfrieerfftsnhh',
            port: 5432,
            password: 'fc3f34cad9dc486ee12dae073396bcdd394ec341ea4ca14269dd623563e46ee4',
            dialect: 'postgres'
        };

module.exports = { router, dbconfig} ;