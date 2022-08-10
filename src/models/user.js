'use strict';
import { Model } from 'sequelize'
import bcrypt from "bcrypt"
const saltRounds = 10;

const PROTECTED_ATTRIBUTES = ['password'];
export default (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      for (const protectedAttr of PROTECTED_ATTRIBUTES) {
        delete attributes[protectedAttr];
      }
      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    userType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(saltRounds));
    }
  });

  User.prototype.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  };

  // need to use in development only
  // if (process.env.NODE_ENV === "development") {
  //   User.sync({ alter: true })
  // }
  User.associate = ((models) => {
    User.hasMany(models.Employee, {
      foreignKey: "userId"
    });
  })
  return User;
};