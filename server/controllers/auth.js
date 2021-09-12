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

exports.login = async(req,res,next) =>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(404).json({
            success:false,
            message:'Please provide email and password'
        })
    }
    try{
        const user = await User.findOne({email}).select('+password')
        if(!user){
            res.status(404).json({
                success:false,
                message:'User does not exist'
            })
        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            res.status(404).json({
                success:false,
                message:'Incorrect Password'
            })
        }
        res.status(201).json({
            success:true,
            token:"ttdsaaddaas",
            message:'User Logged In Successfully'
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.forgotPassword = (req,res,next) =>{
    res.send('Forgot Password Route')
}

exports.resetPassword = (req,res,next) =>{
    res.send('Reset Password Route')
}