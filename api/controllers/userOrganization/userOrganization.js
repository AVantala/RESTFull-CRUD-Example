'use strict'

const queries = require('../../../services/queryFile')
const operation = require('../../../services/queries')

let jsonValidation = require('./validation')

function insert (req, res) {
  let data = req.body

  jsonValidation.createValidation(data)
    .then(() => {
      let queryString = queries.userOrgInsert(data)

      operation.createOperation(queryString)
        .then((response) => {
          if (response.status === 'success') {
            response['message'] = 'User Organization Maped Successfully.'
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
  let queryString = queries.userOrgList()

  operation.readOperation(queryString)
    .then((response) => {
      if (response.status === 'success') {
        response['message'] = 'User Organization Mapping Fetch Successfully.'
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
  insert, read
}
