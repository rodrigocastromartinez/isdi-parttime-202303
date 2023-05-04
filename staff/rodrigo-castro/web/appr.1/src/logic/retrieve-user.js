console.log('load retrieve user')

import { validateId } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'

export const retrieveUser = (userId) => {
    validateId(userId, 'user id')

    const foundUser = findUserById(userId)

    if(!foundUser) throw new Error('User not found')

    const user = {
        name: foundUser.name
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    return user

}