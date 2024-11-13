const db=require('../config/db');

exports.registerUser = (username, phone, email, hashedPassword, gender, location, callback) => {
    const role = 'user';
    const query = "insert into users (username, phone, email, password, role, gender, location) values(?,?,?,?,?,?,?)";
    db.query(query, [username, phone, email, hashedPassword, role, gender, location], callback);
};

exports.getUserByEmail=(email,callback)=>{
    const query="select * from users where email=?";

    db.query(query,[email],(err,results)=>{
        if(err){
            return callback(err,null);
        }
        if(results.length>0){
            callback(null,results[0]);
        } else{
            callback(null,null);
        }
    });
};