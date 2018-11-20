'use strict'

const Validator = require('jsonschema').Validator
const q = require('q')
const _ = require('underscore')
let v = new Validator()

function readValidation (data) {
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
    '$id': 'user_org_report_schema',
    'type': 'object',
    'title': 'The Root Schema',
    'properties': {
      'first_name': {
        '$id': '#first_name',
        'type': 'null',
        'title': 'The First_name Schema',
        'default': null
      },
      'last_name': {
        '$id': '#last_name',
        'type': ['string', 'null'],
        'title': 'The Last_name Schema',
        'default': null
      },
      'username': {
        '$id': '#username',
        'type': ['string', 'null'],
        'title': 'The Username Schema',
        'default': null
      },
      'organization_name': {
        '$id': '#organization_name',
        'type': ['string', 'null'],
        'title': 'The Organization_name Schema',
        'default': null
      },
      'user_organization_role': {
        '$id': '#user_organization_role',
        'type': ['string', 'null'],
        'title': 'The User_organization_role Schema',
        'default': null
      },
      'column_name': {
        '$id': '#column_name',
        'type': ['string', 'null'],
        'title': 'The Column_name Schema',
        'default': ['string', 'null']
      },
      'order': {
        '$id': '#order',
        'type': ['string', 'null'],
        'enum': ['ASC', 'DESC'],
        'title': 'The Order Schema',
        'default': 'ASC',
        'pattern': '^(.*)$'
      },
      'page_index': {
        '$id': '#page_index',
        'type': ['integer', 'null'],
        'title': 'The Page_index Schema',
        'default': 0,
        'pattern': '^(.*)$'
      },
      'page_size': {
        '$id': '#page_size',
        'type': ['integer', 'null'],
        'title': 'The Page_size Schema',
        'default': 2,
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
  readValidation
}
