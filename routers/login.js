/*Use the credentials sent inside the body 
to authenticate the user. On successful login, 
create a new JWT with the user id as the subject
 and send it back to the client. If login fails, 
 respond with the correct status
 code and the message: 'You shall not pass!'*/


 const DB_Hookz = require('../data/dbhooks/DB_Hookz.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')

const router  = express.Router()


	router.use(express.json())
	router.post('/', logValidation,(req,res)=>{


			req.session.user={
				...req.body,
				token:req.token
			}


			res.status(201).json({
				msg:`WELCOME ${req.body.username} from ${req.body.department}`,
				token:req.token
					})

		})



	async function logValidation(req,res,next){
			const bod = req.body
			if(
				!bod ||
				!bod.username ||
				!bod.password 
				){
				res.status(400).json({
					msg:"invalid input values (UI)end"
				})
			}else{
				DB_Hookz.verifyAccount(bod.username)
				.then(bool=>{
						req.body.department = bool.department
						if(bcrypt.compareSync(bod.password,bool.password)){
						const payload = {
							user:bool.username,
							department:bool.department
						}

						

						const secret = '$3CR3TK3Y'

						 jwt.sign(payload,secret,(err,token)=>{
						 	if(!err){
						 			req.token = token
						 			next()
						 	}else{
						 		res.status(500).json({msg:'ran out of tokens...please wait'})
						 	}
						 })

						}else{
									res.status(401).json({
								msg:"WRONG PASSWORD!!"
							})
						}
					
				})
			

			}
	}



	module.exports=router