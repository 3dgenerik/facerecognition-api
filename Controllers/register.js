export const register = (db, bcrypt) => (req, res) => {
    const {email, name, password} = req.body;

    const hash = bcrypt.hashSync(password, 10);
    
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        //'*' return OBJ, 'email' return only one property of that OBJ
        .returning('email')
        .then(loginEmail => {
            // console.log(loginEmail[0]);
            trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                joined: new Date()
            })
            .then(response => res.json(response[0]))
            .catch(err => res.status(400).json(err))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
}
