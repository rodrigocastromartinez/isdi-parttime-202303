const { readFile, writeFile } = require('fs')
const { validators: { validateId } } = require('com')

module.exports = (userId, postId, callback) => {
    validateId(userId)
    validateId(postId)

    readFile('./data/users.json', 'utf8', (error, usersJson) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(usersJson)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId}, not found`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, postsJson) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(postsJson)

            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if (post.privacy === 'public') {
                post.privacy = 'privated'
            } else {
                post.privacy = 'public'
            }

            postsJson = JSON.stringify(posts)

            writeFile('./data/posts.json', postsJson, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}