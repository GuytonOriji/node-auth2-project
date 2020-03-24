




exports.up = function(knex) {
 return knex.schema.createTable('users',(tbl_col)=>{
  		tbl_col.increments()//id

  		tbl_col.string('username').notNullable()

  		tbl_col.string('password').notNullable().unique()

  		tbl_col.string('department').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};




