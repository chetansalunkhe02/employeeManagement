'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


    }
  }

  Employee.init({
    userId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });

  Employee.associate = ((models) => {
    Employee.belongsTo(models.User, {
      foreignKey: "userId"
    });

    Employee.belongsTo(models.Department, {
      foreignKey: "departmentId",
      // onDelete: 'cascade'
    });
  })

  if (process.env.NODE_ENV === "development") {
    // Employee.sync({ force: true })
  }
  return Employee;
};