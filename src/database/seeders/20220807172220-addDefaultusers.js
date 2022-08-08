'use strict';
import bcrypt from "bcrypt"
export async function up(queryInterface, Sequelize) {
  const saltRounds = 10
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
  await queryInterface.bulkInsert('Users', [
    {
      name: "admin",
      email: "admin@mail.com",
      userName: "admin",
      password: bcrypt.hashSync("Test@123", bcrypt.genSaltSync(saltRounds)),
      status: "active",
      userType: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}
