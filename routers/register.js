/*reates a user using the information sent 
inside the body of the request. Hash the 
password before saving the user to the database.*/
const DBHook = require('../data/dbhooks/DB_Hookz.js')
const bcrypt = require('bcryptjs')
const express = require('express')

const router  = express.Router()

	

	router.use(express.json())
	router.post('/', regValidation,(req,res)=>{
		DBHook.regUser(req.body)
		.then(user=>{
			res.status(201).json({
				user:user
			})
		})
		.catch(err=>{
			res.status(500).json("CANNOT REGISTER YOU RIGHT NOW")
		})
	})





	async function regValidation(req,res,next){
			const bod = req.body

			if(
				!bod ||
				!bod.username ||
				!bod.password ||
				!bod.department
				){
				res.status(400).json({
					msg:"invalid input values (UI)end"
				})
			}else{
				const HC = process.env.HASHING_ROUNDS || 8
				const hash = bcrypt.hashSync(req.body.password,HC)
				bod.password = hash
				next()
			}
	}



	module.exports=router