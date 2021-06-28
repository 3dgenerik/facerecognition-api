export const signin =  (req, res, db, bcrypt) => {
    const {email, password} = req.body;

    db.select('email', 'hash')
        .from('login')
        .where('email','=', email)
        .then(data => {
            const isCorrectPass = bcrypt.compareSync(password, data[0].hash);
            if(isCorrectPass){
                db.select('*').from('users')
                    .where('email','=', email )
                    . then(user => {
                        console.log(user);
                        res.json(['Success', user[0]]);
                    })
                    .catch(err => {
                        return res.status(400).json('Wrong email or pass. Please type correct email or password.')
                    })
                }else{
                    return res.status(400).json('Wrong email or pass. Please type correct email or password.')
            }
        })
        .catch(err => res.status(404).json('Failed to get database user.'));
}