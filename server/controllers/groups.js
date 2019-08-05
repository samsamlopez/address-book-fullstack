
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

function assign(req,res){
  const db = req.app.get('db');
  
}

module.exports = {
    create,
    assign
};