let queries = require('../../../services/queryFile')
let operation = require('../../../services/queries')

function insert (req, res) {
  let data = req.body

  let queryString = queries.orgInsert(data)

  operation.createOperation(queryString)
    .then((response) => {
      if (response.status === 'success') {
        response['message'] = 'Organization Create Successfully.'
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

function read (req, res) {

  let queryString = queries.orgList()

  operation.readOperation(queryString)
    .then((response) => {
      if (response.status === 'success') {
        response['message'] = 'Organization List Fetch Successfully.'
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
