const decodedUser = {
  id: 1,
  role: 'admin',
  email: 'admin@admin.com',
}



const tokenValidData = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5NjI5NTQxLCJleHAiOjE2OTAyMzQzNDF9.FqjjwmhGLIaXWhLNoF4eLk - FZ33QtYmWixdeGfon2p0'


const authWithoutToken = ' '


const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5NjI5NTQxLCJleHAiOjE2OTAyMzQzNDF9.FqjjwmhGLIaXWhLNoF4eLk'



export { tokenValidData, authWithoutToken, invalidToken, decodedUser }