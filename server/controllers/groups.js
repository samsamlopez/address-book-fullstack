
// Delete Group Done
// Edit group name Done

// Add members to group DONE
// View members per groups DONE

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
  const {contact} = req.body;
  const group_id = req.query.group_id
  // console.log(group_id);
  var temp_res = [];
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
}

function viewMember(req, res){
  const db = req.app.get('db');

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

}

function editName(req,res){
  const db = req.app.get('db');
  const {name} = req.body

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


}

function deleteGroup(req,res){
  const db = req.app.get('db');

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
}
// SELECT contact.* FROM contact WHERE id NOT IN(SELECT contact_id from group_list, groups WHERE groups.id = group_list.group_id AND groups.id = 2)
function notInGroup(req,res){
  const db = req.app.get('db');
  const group_id = req.query.group_id
  db
  .query(
    `SELECT contact.* FROM contact WHERE id NOT IN(SELECT contact_id from group_list, groups WHERE groups.id = group_list.group_id AND groups.id = ${group_id})`
  )
  .then(data=>{
    res.status(200).json(data)
  })

}

module.exports = {
    create,
    fetch,
    assign,
    viewMember,
    editName,
    deleteGroup,
    notInGroup
};