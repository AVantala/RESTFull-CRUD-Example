let app = require('express')()
let bodyParser = require('body-parser')
let config = require('./config/config.json')
let helmet = require('helmet')
let cors = require('cors')

/* THIS BLOCK CHECKS FOR VALID AUTH TOKEN */
let isAuthorized = function (req, res, next) {
  let authorizationToken = config.authorization
  let headersAuthorizationToken = req.headers.authorization
  if (headersAuthorizationToken) {
    if (headersAuthorizationToken === authorizationToken) {
      next()
    } else {
      res.status(401).send({
        code: 401,
        error: 'Unauthorized access!'
      })
    }
  } else {
    res.status(400).send({
      code: 400,
      error: 'authorization is required!'
    })
  }
}

app.use(helmet())

app.use(cors())

app.use(bodyParser.raw({
  limit: '50mb'
}))
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

const BASE_URL = config.BASE_URL

/* Ping to test server is running */
app.get(BASE_URL + '/ping', function (req, res) {
  res.status(200).send('Pong')
})

app.get(BASE_URL + '/auth', isAuthorized, (req, res) => {
  res.status(200).send('Authorized successful')
})

// user create
app.post(BASE_URL + '/user', isAuthorized, require('./api/controllers/user/user').insert)

// user read
app.get(BASE_URL + '/users', isAuthorized, require('./api/controllers/user/user').read)

// user update
app.put(BASE_URL + '/user/:user_id', isAuthorized, require('./api/controllers/user/user').update)

// user delete
app.delete(BASE_URL + '/user/:user_id', isAuthorized, require('./api/controllers/user/user').userDelete)

// organization create
app.post(BASE_URL + '/organization', isAuthorized, require('./api/controllers/organization/organization').insert)

// organization read
app.get(BASE_URL + '/organizations', isAuthorized, require('./api/controllers/organization/organization').read)

// user organization mapping
app.post(BASE_URL + '/userOrganizationMap', isAuthorized, require('./api/controllers/userOrganization/userOrganization').insert)

// user organization mapping list
app.get(BASE_URL + '/userOrganizationMappingList', isAuthorized, require('./api/controllers/userOrganization/userOrganization').read)

// user organization report
app.get(BASE_URL + '/userOrgReport', isAuthorized, require('./api/controllers/reports/userOrgReport').report)

/* Error occured */
app.use(function (err, req, res, next) {
  console.log('-----Something broke!---', err)
  res.status(500).send('Something broke!')
})

/* No path matched */
app.get('*', function (req, res) {
  console.log('no route found,throwing 404 error.' + req.url)
  res.status(404).send('404 PAGE not found >' + req.url + '<<')
})

/* Start server */
let port = process.env.PORT || 3000
let server = app.listen(port)
server.timeout = 600000

console.log('API is running on port ' + port)
console.log('try this:\ncurl http://localhost:' + port + BASE_URL + '/ping')

process.on('uncaughtException', function (err) {
  console.log('-----uncaughtException----- ', err)
})

module.exports = { app }
