


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'iSpam_x',password:'F#F#DDW<foe24c[ko3d:u7u ',department:'frontend'},
        {id: 2, username: 'xMrVicious_-x',password:'J&J%<RRR#C$YHUJY:CCD ',department:'produce'},
        {id: 3, username: 'XxGlitch_x',password:'LL(L*K&J*J<oS@S@y6o73Gg44U&re:fe3 ',department:'frozen'}
      ]);
    });
};





