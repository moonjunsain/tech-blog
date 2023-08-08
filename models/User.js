const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class User extends Model{}

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'user'
    }
)

module.exports = User