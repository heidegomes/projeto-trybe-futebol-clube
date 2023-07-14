const userMock = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: 'hashed-valid-password',
}

const loginValidData = {
  email: 'rafatedesco@gmail.com',
  password: 'valid-password'
}

const loginWithoutEmail = {
  password: 'valid-password'
}

const loginWithoutPassword = {
  email: 'valid@email.com',
}
export { userMock, loginValidData, loginWithoutEmail, loginWithoutPassword }