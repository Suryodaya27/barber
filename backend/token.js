const jwt = require('jsonwebtoken');
// const secretKey = require('./config')
// Generate a token with a secret key
const secretKey = 'iamsurya';
const token = jwt.sign({ userId: 1 }, secretKey);
// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NTc5OTkxMH0.d7UxEzrWWdUhYHpE_fDsWUggswvFNe6uveXbt7Exr0s";
const decoded = jwt.verify(token, secretKey);
module.exports = token;
console.log(token);
console.log(decoded);
