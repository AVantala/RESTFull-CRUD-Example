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
    '$id': 'user_organization_schema',
    'type': 'object',
    'title': 'The User Organization Mapping Schema',
    'required': [
      'user_id',
      'organization_id',
      'user_organization_role'
    ],
    'properties': {
      'user_id': {
        '$id': '#user_id',
        'type': 'integer',
        'title': 'The user_id Schema',
        'default': '',
        'pattern': '^(.*)$'
      },
      'organization_id': {
        '$id': '#organization_id',
        'type': 'integer',
        'title': 'The organization_id Schema',
        'default': '',
        'pattern': '^(.*)$'
      },
      'user_organization_role': {
        '$id': '#user_organization_role',
        'type': 'string',
        'title': 'The user_organization_role Schema',
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
