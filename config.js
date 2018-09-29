module.exports = {
  mongodb: {
    URI: 'your mongodb URI with username and password'
  },
  httpErrors: {
    notFoundErr: { status: 404, message: 'Not found error!' },
    internalServerErr: { status: 500, message: 'Internal server error!' },
    badRequestErr: { status: 400, message: 'Bad request error!' },
    alreadyExistErr: { status: 400, message: 'The given user name is already exists!' },
    validationErr: { status: 400, message: 'Please check the information entered!' }
  }
}