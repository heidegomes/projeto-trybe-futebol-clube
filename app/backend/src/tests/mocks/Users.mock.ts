const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'hashed-valid-password',
}

const loginValidData = {
  email: 'user@user.com',
  password: 'hashed-valid-password'
}

const loginWithoutEmail = {
  password: 'hashed-valid-password'
}

const loginWithoutPassword = {
  email: 'valid@email.com',
}

const loginInvalidEmail = {
  email: '@exemplo.com' || 'exemplo@exemplo' || 'exemplo@.com' || 'exemplo.exemplo.com',
  password: 'hashed-valid-password'
}

const loginInvalidPassword = {
  email: 'user@user.com',
  password: 'pass'
}


export { userMock, loginValidData, loginWithoutEmail, loginWithoutPassword, loginInvalidEmail, loginInvalidPassword }