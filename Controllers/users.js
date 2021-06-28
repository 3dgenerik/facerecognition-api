export const users =  (req, res, db) => {
    db.select('*')
        .from('users')
        .then(users => {
            res.json(users);
        })
}