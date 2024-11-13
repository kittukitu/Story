// controllers/adminController.js
const userModel = require('../models/userModel');  // Assuming you have a User model

exports.adminPage= (req, res) => {
  const currentUser =req.session.user;

  if(currentUser.role==='user'){
    return res.redirect('/');
  }
  userModel.getUserWithTranslationCount((err,results)=>{
    if(err){
      console.error(err);
      return res.redirect('/');
    }
    res.render('admin',{users:results,currentUser});
  })
};


