exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex("table")
      .del()
      .then(function() {
        // Inserts seed entries
        return knex("table").insert([{}, {}]);
      })
  ]);
};
