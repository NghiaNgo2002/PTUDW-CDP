module.exports = {
  type: 'object',
  properties: {
    fullname: { type: 'string'},
    phonenumber: {type: 'string'},
    email: { type: 'string'},
    password: { type: 'string'},
    newpassword: { type: 'string'},
    renewpassword: { type: 'string'},
  },
  
  additionalProperties: false,
};