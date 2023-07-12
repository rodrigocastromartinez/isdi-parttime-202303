const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const updateUserEmail = require('./updateUserEmail')

mongoose.connect('mongodb://127.0.0.1:27017/data-project-test')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => User.create({ name: 'pepe.grillo', email: 'pepe@grillo.com', password: '123123123', avatar: 'http://www.image.com/avatar.jpg' }))
    .then(user => updateUserEmail(user.id, 'pepe@grillo.com', 'grillo@pepe.com', '123123123'))
    .then(console.log)
    .catch(console.error)
    .finally(() => mongoose.disconnect())