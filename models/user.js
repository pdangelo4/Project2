'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your firstname!'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please give a valid email address'
        }
      }
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 32],
          msg: 'Your password should be between 8 and 32 characters in length.'
        }
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profile: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: {
          msg: 'Provide a valid picture!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (pendingUser) => {
        if (pendingUser && pendingUser.password) {
          // Hash the password with BCrypt
          let hash = bcrypt.hashSync(pendingUser.password, 12);

          // Reassign the user's password to the hashed version of that password
          pendingUser.password = hash;
        }
      }
    }
  });

  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.stock)
  };

  // Custom function: validPassword
  // This will check an instance of the model (specific user) against a typed in password
  // Use bcrypt to compare hashes
  user.prototype.validPassword = function(typedInPassword) {
    return bcrypt.compareSync(typedInPassword, this.password);
  }

  return user;
};
