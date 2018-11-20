'use strict'

const q = require('q')
const dbQuery = require('./dbQuery')
const dbName = 'INDX'

function createOperation (queryString) {
  let deferred = q.defer()

  dbQuery.select(queryString, dbName)
    .then((response) => {
      deferred.resolve({
        status: 'success',
        message: '',
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

function readOperation (queryString) {
  let deferred = q.defer()
  dbQuery.select(queryString, dbName)
    .then((response) => {
      deferred.resolve({
        status: 'success',
        message: '',
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

function updateOperation (queryString) {
  let deferred = q.defer()

  dbQuery.select(queryString, dbName)
    .then((response) => {
      deferred.resolve({
        status: 'success',
        message: '',
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

function deleteOperation (queryString) {
  let deferred = q.defer()

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

module.exports = {
  createOperation, readOperation, updateOperation, deleteOperation
}
