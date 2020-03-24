/*If the user is logged in, respond 
with an array of all the users contained 
in the database. If the user is not logged 
in respond with the correct status code 
and the message: 'You shall not pass!'.*/

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

	router.get('/',(req,res)=>{
			DB_Hookz.getUsers()
			.then(accounts=>{
				res.status(201).json({
				accounts:accounts
					})
			})
			.catch(err=>{
				res.status(500).json({
					msg:"CANNOT GET USERS AT THIS TIME"
				})
			})

		})



	router.get('/:id',(req,res)=>{
			DB_Hookz.getUsers(parseInt(req.params.id))
			.then(user=>{
				res.status(201).json({
				account:user
					})
			})
			.catch(err=>{
				res.status(500).json({
					msg:"CANNOT GET USERS AT THIS TIME"
				})
			})

		})






	module.exports=router