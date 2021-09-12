const User = require('../models/User')


exports.register = async (req,res,next) =>{
      const {username,email,password} = req.body
      try{
          const user = await User.create(
              {username,email,password
            })
            res.status(201).json({
                message:'User Created Successfully',
                success:true,
                user
            })

      }catch(err){
          res.status(400).json({
              success:false,
              message:err.message
          })
      }
}

exports.login = (req,res,next) =>{
    res.send('Login Route')
}

exports.forgotPassword = (req,res,next) =>{
    res.send('Forgot Password Route')
}

exports.resetPassword = (req,res,next) =>{
    res.send('Reset Password Route')
}