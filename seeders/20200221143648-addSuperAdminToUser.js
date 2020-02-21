'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const superAdmin = [
      {username: 'superadmin'},
      {email: 'superadmin@ninoloid.com'},
      {password: 'superadmin'},
      {isAdmin: true},
      {isActivated: true}
    ]
      return queryInterface.bulkInsert('Users', superAdmin, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
