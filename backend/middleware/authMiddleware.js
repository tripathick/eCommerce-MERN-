import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async(req,res,next) => {
    let token

    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer'))
    {
       // console.log('token found')
       try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            //console.log(decoded)
            
            req.user = await User.findById(decoded.id).select('-password')

            next()
       } catch (error) {
           console.error(error)
           res.status(401)
           throw new Error('Not Authorized , Token failed , Soory!')
       }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized , no token !')
    }

    // next()
})

export { protect}