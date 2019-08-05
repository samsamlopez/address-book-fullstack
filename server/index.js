const express = require('express');
const massive = require('massive');
const users = require('./controllers/user.js');
const cors = require("cors");
const groups = require('./controllers/groups.js')


massive({
    host: 'localhost',
    port: 5432,
    database: 'addressbookdb',
    user: 'postgres',
    password: 'addressbookdb',
  }).then(db => {
    const app = express();
   
    app.use(cors());  
    app.set('db', db);
  
    app.use(express.json());
    
    app.post('/api/users', users.create);
    app.post('/api/login', users.login);
    app.post('/api/addContact/:user', users.addContact);
    app.get('/api/getContact', users.getContact);
    app.patch('/api/update', users.updateContact);
    app.delete('/api/delete', users.deleteContact);
    app.get('/api/userDetails/:id', users.getUserDetails);
    
    app.post('/api/addGroup',groups.create);
  
    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  });