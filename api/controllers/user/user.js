let q = require('q')
let queries = require('../../../services/queryFile')
let dbQuery = require('../../../services/dbQuery')
let dbName = 'INDX'

function insert (data) {
  let deferred = q.defer()

  let queryString = queries.userInsert(data)
  dbQuery.select(queryString, dbName)
    .then((response) => {
      deferred.resolve({
        status: 'success',
        message: 'User Inser Successfully.'
        // data: response[0]
      })
    })
    .catch((error) => {
      deferred.reject({
        status: 'failed',
        error: error
      })
    })

  return deferred.promise
}

function list () {
  let deferred = q.defer()

  let queryString = queries.userList()
  dbQuery.select(queryString, dbName)
    .then((response) => {
      deferred.resolve({
        status: 'success',
        message: 'User List Fetch Successfully.',
        data: response
      })
    })
    .catch((error) => {
      deferred.reject({
        status: 'failed',
        error: error
      })
    })

  return deferred.promise
}

function update (data, userId) {
  let deferred = q.defer()

  let queryString = queries.userUpdate(data, userId)
  console.log(queryString)
  dbQuery.select(queryString, dbName)
    .then((response) => {
      deferred.resolve({
        status: 'success',
        message: 'User Details Update Successfully.',
        data: response
      })
    })
    .catch((error) => {
      deferred.reject({
        status: 'failed',
        error: error
      })
    })

  return deferred.promise
}

function deleteUser (userId) {
  let deferred = q.defer()

  let queryString = queries.userDelete(userId)
  dbQuery.select(queryString, dbName)
    .then((response) => {
      deferred.resolve({
        status: 'success',
        message: 'User Delete Successfully.',
        data: response
      })
    })
    .catch((error) => {
      deferred.reject({
        status: 'failed',
        error: error
      })
    })

  return deferred.promise
}

function userInsert (req, res) {
  insert(req.body)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(200).send(error)
    })
    .done()
};

function userList (req, res) {
  list()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(200).send(error)
    })
    .done()
};

function userUpdate (req, res) {
  let userId = req.params.user_id
  update(req.body, userId)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(200).send(error)
    })
    .done()
};

function userDelete (req, res) {
  let userId = req.params.user_id
  deleteUser(userId)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(200).send(error)
    })
    .done()
};

module.exports = {
  userInsert, userList, userUpdate, userDelete
}
