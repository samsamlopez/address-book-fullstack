
const jwt = require('jsonwebtoken');
const secret = require('../../secret.js')

function create(req,res){
    const db = req.app.get('db');
    const {name, user_id} = req.body


    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);

      db.groups
    .insert(
      {
        name,
        user_id
      }
    )
    .then(data=>{
        res.status(201).json(data)
    })
   }catch (err) {
      res.status(500).end();
    }

    
}

function fetch(req,res){
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);

    db
  .query(
    'SELECT * FROM groups WHERE user_id = ${id}',
    {
      id:req.query.id
    }
  )
  .then(data=>{
    res.status(200).json(data)
  })
 }catch (err) {
    res.status(500).end();
  }

  
}

function assign(req,res){
  const db = req.app.get('db');
  const {contact} = req.body;
  const group_id = req.query.group_id
  // console.log(group_id);
  var temp_res = [];

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);

    contact.map(contact_id=>{
    // console.log(contact_id)
    db.group_list
    .insert(
      {
        contact_id,
        group_id
      }
    )
    .then(data=>{
      temp_res.push(data)
      res.status(201).json(temp_res);
    })
  })
 }catch (err) {
    res.status(500).end();
  }
  
}

function viewMember(req, res){
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);
    db
      .query(
        'SELECT contact.* from contact,groups,group_list WHERE  contact.id = group_list.contact_id AND groups.id = group_list.group_id AND groups.id = ${id} ',
        {
          id:req.query.group_id
        }
      )
      .then(data=>{
        res.status(200).json(data)
      })
    
 }catch (err) {
    res.status(500).end();
  }

  

}

function editName(req,res){
  const db = req.app.get('db');
  const {name} = req.body

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);

    db.groups
  .update(
    {
      id: req.params.id,
    },
    {
      name: name,
    },
  )
  .then(data => res.status(201).json(data))
  .catch(err => {
    console.error(err);
  });
 }catch (err) {
    res.status(500).end();
  }
  
  


}

function deleteGroup(req,res){
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);

    db
    .query(
      'DELETE FROM groups WHERE id=${id}',
      {
        id:req.query.gid
      }
    )
    .then(data=>{
      res.status(200).json({message:"Deleted"})
    })
 }catch (err) {
    res.status(500).end();
  }
  
}
// SELECT contact.* FROM contact WHERE id NOT IN(SELECT contact_id from group_list, groups WHERE groups.id = group_list.group_id AND groups.id = 2)
function notInGroup(req,res){
  const db = req.app.get('db');
  const group_id = req.query.group_id;

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);

    db
  .query(
    `SELECT contact.* FROM contact WHERE id NOT IN(SELECT contact_id from group_list, groups WHERE groups.id = group_list.group_id AND groups.id = ${group_id})`
  )
  .then(data=>{
    res.status(200).json(data)
  })
 }catch (err) {
    res.status(500).end();
  }

  
}

function removeMember(req,res){
  const db= req.app.get('db');
  // console.log(req.query.cid, " - ", req.query.gid)

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);
    db
  .query(
    `DELETE FROM group_list WHERE contact_id=${req.query.cid} AND group_id=${req.query.gid}`
  ).then(data=>{
    res.status(200).json({message: "Deleted"})
    
  })
 }catch (err) {
    res.status(500).end();
  }

  
}

module.exports = {
    create,
    fetch,
    assign,
    viewMember,
    editName,
    deleteGroup,
    notInGroup,
    removeMember
};