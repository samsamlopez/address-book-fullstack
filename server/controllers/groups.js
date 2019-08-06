
function create(req,res){
    const db = req.app.get('db');
    const {name, user_id} = req.body

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
}

function fetch(req,res){
  const db = req.app.get('db');

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
}

function assign(req,res){
  const db = req.app.get('db');
  
}

module.exports = {
    create,
    fetch
};