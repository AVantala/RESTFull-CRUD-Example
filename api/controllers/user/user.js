let queries = require('../../../services/queryFile')
let operation = require('../../../services/queries')

function insert (req, res) {
  let data = req.body

  let queryString = queries.userInsert(data)

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
