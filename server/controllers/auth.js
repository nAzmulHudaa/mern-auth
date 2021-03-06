const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')


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
         next(err)
      }
}

exports.login = async(req,res,next) =>{
    const {email,password} = req.body
    if(!email || !password){
       return next(new ErrorResponse('Please provide email and password',400))

    }
    try{
        const user = await User.findOne({email}).select('+password')
        if(!user){
            return next(new ErrorResponse('Invalid Credentials',401))

        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return next(new ErrorResponse('Invalid Credentials',401))
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