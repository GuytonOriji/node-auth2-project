const express = require('express')
const server = express()
const session = require('express-session')
const helmet = require('helmet')

const regRouter = require('../routers/register')
const logRouter = require('../routers/login')
const userRouter = require('../routers/users')
	

		
			
			server.use(session({
				name:'accountSession',
				secret:'$3CR3TK3Y',
				cookie:{
					maxAge:1000 * 60 * 60,
					secure:false,
					httpOnly:true
				},
				resave:false,
				saveUninitialized:true
			}))


server.use(express.json())
			server.use(stamp)

			server.use('/api/register',regRouter)
			server.use('/api/login',logRouter)
			server.use('/api/users',auth,userRouter)
			




function stamp(req,res,next){
console.log(`${req.protocol} ${req.method} request made at ${new Date()}`)
next()
}


function auth(req,res,next){
			if(req.session &&
				req.session.user){
				next()
			}else{
				res.status(401).send('<h1>Stay Out!</h1>')
			}
}

			module.exports=server