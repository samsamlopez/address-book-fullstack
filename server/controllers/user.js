
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret.js')

function create(req, res) {
    const db = req.app.get('db');
  
    const { username, password, firstname, lastname } = req.body;


    db.users
      .find(
        {
          username
        }
      )
      .then(data=>{
        if(data.length !== 0){
          res.status(200).json({error:true, message:'User Already exists'})
        }else{

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
      })


  
    
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


  function addContact(req, res){
    const db = req.app.get('db');
    const { first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_or_province, postal_code, country } = req.body;

    const user_id = req.params.user;
    
    const temp = [];

    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);

      db.contact
      .insert(
        {
          first_name,
          last_name,
          home_phone,
          mobile_phone,
          work_phone,
          email,
          city,
          state_or_province,
          postal_code,
          country,
        }
      )
      .then(data=>{
          temp.push(data);
          let contact_id = data.id;
          // console.log(userId,"-",contactId);
          
          db.address_book
          .insert(
            {
              user_id,
              contact_id,
            }
          ).then(add=>{
            console.log(add)
            temp.push(add)
            res.status(201).json(temp)
          })
      })
    }
    catch (err) {
      res.status(500).end();
    }
    // .catch(err => {
    //   console.error(err);
    // });
  }

  function getContact(req, res){
    const db = req.app.get('db');
    const userID = req.query.id;
    // console.log(req.query.id)

  
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);
    db
    .query(
      `Select contact.* from users, contact, address_book WHERE users.id = address_book.user_id AND contact.id = address_book.contact_id AND users.id = ${userID} ORDER BY contact.last_name ${req.query.sort}`

    )
    .then(data=>{
      res.status(200).json(data)
    })
  }catch (err) {
    res.status(500).end();
  }
  }

  function updateContact(req, res){
    const db = req.app.get('db');

    const {
      first_name,
      last_name,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      state_or_province,
      postal_code,
      country
    } = req.body;

    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);

    db.contact
    .update(
      {
        id: req.query.cid
      },
      {
        first_name,
        last_name,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        state_or_province,
        postal_code,
        country
      }
    )
    .then(data =>{
      res.status(201).json(data)
    })
    .catch(err => {
      console.error(err);
    })
   }catch (err) {
      res.status(500).end();
    }

  }

  function deleteContact(req,res){
    const db = req.app.get('db');
    let deleted = [];
    // console.log(req.query.cid);

    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);
      db
    .query(
      'DELETE FROM address_book WHERE contact_id=${id}',
      {
        id:req.query.cid
      }
    )
    .then(data=>{
      deleted.push(data);
      db
      .query(
        'DELETE FROM contact WHERE id=${id}',
        {
          id:req.query.cid
        }
      )
      .then(data2=>{
        deleted.push(data2)
        res.status(200).json(deleted)
      })
    })
   }catch (err) {
      res.status(500).end();
    }
    
  }

  function getUserDetails(req, res){
    const db = req.app.get('db');
    
    const id = req.params.id

    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);

      db.users
    .findOne(
      {id}
      )
    .then(data => {
      res.status(200).json(data)
    })
   }catch (err) {
      res.status(500).end();
    }


    


  }

  function getAllUsername(req,res){
    const db = req.app.get('db');


    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);

    db
    .query(
      `SELECT username FROM users`
    )
    .then(data=>{
      res.status(200).json(data)
    })
   }catch (err) {
      res.status(500).end();
    }
    
  }

module.exports = {
    create,
    login,
    addContact,
    getContact,
    updateContact,
    deleteContact,
    getUserDetails,
    getAllUsername
  };