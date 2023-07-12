import { validators } from 'com'

const { validateToken, validateUrl } = validators

/**
 * Updates user avatar
 * @param {string} token user's token
 * @param {string} avatar avatar url
 * @param {function} callback 
 */

export const updateUserAvatar = (token, avatar, callback) => {
    validateToken(token, 'token')
    validateUrl(avatar, 'Avatar url')

    if (callback) {
        const xhr = new XMLHttpRequest

        xhr.onload = () => {
            const { status } = xhr

            if (status !== 204) {
                const { response: json } = xhr
                const { error } = JSON.parse(json)

                callback(new Error(error))

                return
            }

            callback(null)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/avatar`)

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = { avatar }
        const json = JSON.stringify(data)

        xhr.send(json)
    } else
        return fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ avatar })
        })
            .then(res => {
                if (res.status !== 204)
                    return res.json().then(({ error: message }) => { throw new Error(message) })
            })
}