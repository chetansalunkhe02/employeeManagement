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
  await queryInterface.bulkInsert('Departments', [
    {
      name: "dep1",
      email: "dep1@mail.com",
      phone: 122121212,
      description: "dep1",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "dep2",
      email: "dep2@mail.com",
      phone: 1221212121,
      description: "dep2",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}
