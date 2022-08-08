'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Department.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Name already exists',
      },
      validate: {
        notNull: {
          args: true,
          msg: "Please enter name "
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
        notNull: {
          args: true,
          msg: "Please enter email address"
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter phone"
        },
      }
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
  });

  Department.associate = ((models) => {
    Department.hasMany(models.Employee, {
      foreignKey: "departmentId"
    });
  })
  // need to use in development only
  // if (process.env.NODE_ENV === "development") {
  //   Department.sync({ force: true })
  // }

  return Department;
};