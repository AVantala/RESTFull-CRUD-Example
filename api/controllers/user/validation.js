'use strict'

const Validator = require('jsonschema').Validator
const q = require('q')
const _ = require('underscore')
let v = new Validator()

function createUpdateValidation (data) {
  let deferred = q.defer()

  data = _.mapObject(data, (val, key) => {
    if (val === '') {
      return null
    } else {
      return val
    }
  })

  let schema = {
    'definitions': {},
    '$id': 'user_schema',
    'type': 'object',
    'title': 'The User Schema',
    'required': [
      'first_name',
      'last_name',
      'username'
    ],
    'properties': {
      'first_name': {
        '$id': '#first_name',
        'type': 'string',
        'title': 'The First_name Schema',
        'default': '',
        'pattern': '^(.*)$'
      },
      'last_name': {
        '$id': '#last_name',
        'type': 'string',
        'title': 'The Last_name Schema',
        'default': '',
        'pattern': '^(.*)$'
      },
      'username': {
        '$id': '#username',
        'type': 'string',
        'title': 'The Username Schema',
        'default': '',
        'format': 'email',
        'pattern': '^(.*)$'
      }
    }
  }

  // get validation error stack
  let error = _.pluck(v.validate(data, schema).errors, 'stack')
  // format error messages array
  let formatedError = []
  _.each(error, function (err) {
    formatedError.push(err.replace('instance', '').replace('].', '] ').replace('"', '').replace('"', '').replace('.', ''))
  })

  if (_.isEmpty(formatedError)) {
    deferred.resolve(data)
  } else {
    deferred.reject({
      'status': 'faild',
      'error': formatedError
    })
  }

  return deferred.promise
}

// exports
module.exports = {
  createUpdateValidation
}
