'use strict'

const queries = require('../../../services/queryFile')
const operation = require('../../../services/queries')
const _ = require('underscore')

let jsonValidation = require('./validation')

function report (req, res) {
  let data = req.query

  data = _.mapObject(data, (val, key) => {
    if (val === '') {
      return null
    } else {
      if (typeof (val) === 'number' || key === 'order') {
        return val
      } else {
        return `'${val}'`
      }
    }
  })

  jsonValidation.readValidation(data)
    .then(() => {
      let queryString = queries.userOrgReport(data)

      operation.readOperation(queryString)
        .then((response) => {
          if (response.status === 'success') {
            response['message'] = 'User Organization Report Fetch Successfully.'
            res.status(200).send(response)
          } else {
            console.log('error in response')
          }
        })
        .catch((error) => {
          if (_.isEmpty(error.data)) {
            res.status(200).send({
              status: 'failed',
              message: 'No Records found.',
              data: error.data
            })
          }
        })
        .done()
    })
    .catch((error) => {
      res.status(200).send(error)
    })
};

module.exports = {
  report
}
