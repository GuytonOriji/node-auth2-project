const DB = require('../connection.js')


	
module.exports={

	regUser,
	logUser,
	getUsers,
	verifyAccount


}

async function getUsers(id){
if(id){
	return DB('users')
	.where({id})
	.first()
	}else{
	return DB('users')
	}
}



async function regUser(user){
			return DB('users')
		.insert(user)
		.then(([id])=>{
			return DB('users')
			.where({id})
			.first()
		})

}


async function logUser(user){
		return DB('users')
		.where({user})
		.first()
		.then(user=>{
		return {
			valid:true,
			user:user[0]
		}
		})
}





async function verifyAccount(username){

	return DB('users')
	.where({username})
	.first()
	return true
}