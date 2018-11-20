'use strict'

const queries = require('../../../services/queryFile')
const operation = require('../../../services/queries')

let jsonValidation = require('./validation')

function insert (req, res) {
  let data = req.body

  jsonValidation.createUpdateValidation(data)
    .then((jsonRes) => {
      return jsonRes
    })
    .then((jsonRes) => {
      let queryString = queries.userInsert(jsonRes)

      operation.createOperation(queryString)
        .then((response) => {
          if (response.status === 'success') {
            response['message'] = 'User Create Successfully.'
            res.status(200).send(response)
          } else {
            console.log('error in response')
          }
        })
        .catch((error) => {
          res.status(200).send(error)
        })
        .done()
    })
    .catch((error) => {
      res.status(200).send(error)
    })
};

function read (req, res) {
  let queryString = queries.userList()

  operation.readOperation(queryString)
    .then((response) => {
      if (response.status === 'success') {
        response['message'] = 'User List Fetch Successfully.'
        res.status(200).send(response)
      } else {
        console.log('error in response')
      }
    })
    .catch((error) => {
      res.status(200).send(error)
    })
    .done()
};

function update (req, res) {
  let userId = req.params.user_id
  let data = req.body

  jsonValidation.createUpdateValidation(data)
    .then(() => {
      let queryString = queries.userUpdate(data, userId)

      operation.updateOperation(queryString)
        .then((response) => {
          if (response.status === 'success') {
            response['message'] = 'User Update Successfully.'
            res.status(200).send(response)
          } else {
            console.log('error in response')
          }
        })
        .catch((error) => {
          res.status(200).send(error)
        })
        .done()
    })
    .catch((error) => {
      res.status(200).send(error)
    })
};

function userDelete (req, res) {
  let userId = req.params.user_id
  let queryString = queries.userDelete(userId)

  operation.deleteOperation(queryString)
    .then((response) => {
      if (response.status === 'success') {
        response['message'] = 'User Delete Successfully.'
        res.status(200).send(response)
      } else {
        console.log('error in response')
      }
    })
    .catch((error) => {
      res.status(200).send(error)
    })
    .done()
};

module.exports = {
  insert, read, update, userDelete
}
