
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret.js')

function create(req, res) {
    const db = req.app.get('db');
  
    const { username, password, firstname, lastname } = req.body;
  
    argon2
    .hash(password)
    .then(hash => {
      return db.users.insert(
        {
          username,
          password: hash,
          firstname,
          lastname
        },
        {
          fields: ['id', 'username', 'firstname', 'lastname'],
        }
      );
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret); // adding token generation
      res.status(201).json({ ...user, token });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
  }

  function login(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
  
    db.users
      .findOne(
        {
          username,
        },
        {
          fields: ['id', 'username', 'password', 'firstname', 'lastname'],
        }
      )
      .then(user => {
        if (!user) {
          throw new Error('Invalid username');
        }
        // Here is where we check the hashed password from the database
        // with the password that was submitted by the user.
        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error('Incorrect password');
          }
  
          const token = jwt.sign({ userId: user.id }, secret);
          delete user.password; // remove password hash from returned user object
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (
          ['Invalid username', 'Incorrect password'].includes(err.message)
        ) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  }


  function addContact(){
    const db = req.app.get('db');
    const { first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_or_province, postal_code, country } = req.body;
  }


module.exports = {
    create,
    login
  };