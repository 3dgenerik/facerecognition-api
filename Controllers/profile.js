export const profile =  (req, res, db) => {
    const id = req.params.id;
    db.select('*')
        .from('users')
        .where({id:id})
        .then(user => {
            if(user.length === 0){
                res.status(400).json('User not found.')
            }else{
                res.json(user);
            }
        })
        .catch(err => {
            console.log('Error:', err);
        })
}
