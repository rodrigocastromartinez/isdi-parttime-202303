// logic

const checkNewUser = (userEmail) => {
    const userFound = users.find(user => user.email === userEmail)
    if(userFound) throw new Error('Email already registered')
}

const registerNewUser = (users, userName, userEmail, userPassword) => {
    users.push({
        name: userName,
        email: userEmail,
        password: userPassword
    })
}

const findUser = (users, userEmail) => {
    return  users.find(user => user.email === userEmail)
}

const changePassword = (userLogged, users) => {
    homePage.querySelector('.red-text').textContent = ''
    var previousPassword = homePage.querySelector('.previous-password').value
    
    if (previousPassword !== userLogged.password) throw new Error('Your password is incorrect')

    var newPassword = homePage.querySelector('.new-password').value

    if(newPassword.length < 8) throw new Error('Password must be at least 8 characters long')

    if(newPassword === previousPassword) throw new Error('New password must be different than previous')

    var newPasswordRepeated = homePage.querySelector('.repeat-new-password').value

    if(newPasswordRepeated !== newPassword) throw new Error (`New passwords don't match`)

    userLogged.password = newPassword
    users.forEach(user => {
        if(user.email === userLogged.email){
            user.password = userLogged.password
        }
    })
    homePage.querySelector('.red-text').textContent = 'Password succesfully changed'
    homePage.querySelector('.red-text').classList.add('green-text')
}

const updateUserAvatar = (userLogged, avatarUrl) => {
    validateEmail(userLogged.email, emailExpression)
    validateUrl(avatarUrl, 'Avatar url')

    var foundUser = findUser(users, userLogged.email)

    if(!foundUser) throw new Error('User not found')

    foundUser.avatar = avatarUrl
    avatarImg.src = foundUser.avatar
}

const resetLoginPage = (loginPage) => {
    loginPage.querySelector('.red-text').textContent = ''
    loginPage.classList.add('off')
    loginPage.querySelector('form').reset()
}

const resetRegisterPage = (registerPage) => {
    registerPage.querySelector('.red-text').textContent = ''
    registerPage.querySelector('form').reset()
    registerPage.classList.add('off')
}

const goToHomePage = (homePage, foundUser, avatarImg) => {
    homePage.classList.remove('off')
    homePage.querySelector('a[name=my-profile]').textContent =`${foundUser.name}`
    if(foundUser.avatar)
        avatarImg.src = foundUser.avatar
}