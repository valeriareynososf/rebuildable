'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          imgUrl:
            "https://capstone-profile.s3.us-west-1.amazonaws.com/profilelego.png",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "val@example.com",
          username: "Valeria",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl:
            "https://capstone-profile.s3.us-west-1.amazonaws.com/profilelego.png",
        },
        {
          email: "marnie@example.com",
          username: "Marnie",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl:
            "https://capstone-profile.s3.us-west-1.amazonaws.com/profilelego.png",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, {});
  }
};
