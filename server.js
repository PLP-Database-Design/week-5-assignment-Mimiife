const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


app.use(express.json());
app.use(cors());
dotenv.config();

//  Connect to the  database ***

const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    // Check if db connection works
    db.connect((err) =>  {
        // No connection
        if(err) return console.log('Error connecting to the mysql db');
        
        //  Connected successfully
        console.log("connected to mysql successfully as id: ", db.threadId);

        
        // GET Method example
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'));

        // Question 1: Retrieve all patients
        app.get('/data', (req, res) => {
            // Retrieve data from database
            db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
                if (err){
                    console.error(err);
                    res.status(500).send('Error retrieving data');
                }else {
                    // Display the records to the browser
                    res.render('data', {results: results});
                }
            })
        })

        //          Question 2: Retrieve all providers
        app.get('/data', (req, res) => {
            // Retrieve data from database
            db.query('SELECT  first_name, last_name, provider_specialty FROM providers', (err, results) => {
                if (err){
                    console.error(err);
                    res.status(500).send('Error retrieving data');
                }else {
                    // Display the records to the browser
                    res.render('data', {results: results});
                }
            })
        })

        // Question 3: Filter patients by First Name
        app.get('/data', (req, res) => {
            // Retrieve data from database
            db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (err, results) => {
                if (err){
                    console.error(err);
                    res.status(500).send('Error retrieving data');
                }else {
                    // Display the records to the browser
                    res.render('data', {results: results});
                }
            })
        })

        // Question 4: Retrieve all providers by their specialty
        app.get('/data', (req, res) => {
            // Retrieve data from database
            db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
                if (err){
                    console.error(err);
                    res.status(500).send('Error retrieving data');
                }else {
                    // Display the records to the browser
                    res.render('data', {results: results});
                }
            })
        })




        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);

            // Send message to the terminal
            console.log('Sending message to browser...');
            app.get('/', (req,res) => {
                res.send('Server is running on http://localhost:${PORT}')
            }) 
        });
        });