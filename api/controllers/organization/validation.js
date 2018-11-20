'use strict'

const Validator = require('jsonschema').Validator
const q = require('q')
const _ = require('underscore')
let v = new Validator()

function createValidation (data) {
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
    '$id': 'organization_schema',
    'type': 'object',
    'title': 'The Organization Schema',
    'required': [
      'organization_name'
    ],
    'properties': {
      'organization_name': {
        '$id': '#organization_name',
        'type': 'string',
        'title': 'The organization_name Schema',
        'default': '',
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
    createValidation
}
