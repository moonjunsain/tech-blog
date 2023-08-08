const {Model, DataTypes} = require('sequelize')

class Comment extends Model{}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blog',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'comment'
    }
)

module.exports = Comment