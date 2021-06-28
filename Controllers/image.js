export  const image = (req, res, db) => {
    const {id} = req.body;

    db('users')
    .where('id', '=', id)
    .increment('rank', 1)
    .returning('*')
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => {
        res.status(404).json('User not found')
    })
}