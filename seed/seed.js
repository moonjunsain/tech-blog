const sequelize = require('../config/connection')
const {Blog, User, Comment} = require('../models')

const userData = require('./user.json')
const blogData = require('./blogs.json')
const commentData = require('./comments.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Blog.bulkCreate(blogData)

    await Comment.bulkCreate(commentData)
  
    process.exit(0);
  };

  seedDatabase();