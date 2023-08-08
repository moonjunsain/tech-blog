const Comment = require('./Comment')
const User = require('./User')
const Blog = require('./Blog')

// User can have many blog posts
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

// blog belongs to one user
Blog.belongsTo(User, {
    foreignKey: 'user_id'
})

// user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

// comment belongs to one user 
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

// Blog can have many comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
})

// comment belongs to one blog
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
})


module.exports = {
    Comment, User, Blog
}