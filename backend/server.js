const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const { pool } = require("./dbConfig.js");
const bcrypt = require("bcrypt");
const jsonParser = bodyParser.json()
const cors = require('cors');

app.use(cors());
app.use("/",router);

router.post('/users/register', jsonParser, async (req, res) => {

    let { nickname, email, password, password2 } = req.body;

    hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds for the hash

  // check if the email already exists in our db
  pool.query(
      `SELECT * FROM users
          WHERE email = $1`,
      [email],
      (err, results) => {
          if (err) {
              console.log(err);
          }
          // if results.rows.length > 0  -----> account already exists
          if (results.rows.length > 0) {
              res.send({ emailExists: true })
          } else {
              // if the e-mail does not already exist in the db, we can add a new user to the db
              pool.query(
                  `INSERT INTO users (name, email, password)
                  VALUES ($1, $2, $3)
                  RETURNING id, name, email,  password`,
                  [nickname, email, hashedPassword], 
                  (err, results) => {
                      if (err) {
                          throw err;
                      }
                  }
              );
          }
      }
  );


});

// handle POST from LOGIN page
app.post("/users/login", jsonParser,  async (req, res) => {

  let { email, password } = req.body;

  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (err, results) => {
        // if the e-mail exists in the DB, the user exist -> go further
        if (results.rows.length > 0) {
            const user = results.rows[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    // password matches with the decrypted password in db
                    res.send({ passwordIsCorrect: true, username: user.name })
                }
                else {
                    // password does not match with the one in db
                    res.send({ passwordIsCorrect: false })
                }
            });
        }
        else {
            //if the email does not exist
            console.log("EMAIL DOES NOT EXIST in DB");
        }
    }
);

  
});


app.listen(3001,() => {
    console.log("Http Server started on PORT 3001");
    });
