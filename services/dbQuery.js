let q = require('q')
let _ = require('underscore')
let pg = require('pg')
let config = require('../config/db.json')
let pool = {}

// creating new pool
function createPool (dbName) {
  pool[dbName] = new pg.Pool(config[dbName])
}

// create all pool first time
let dbNames = _.keys(config)
_.each(dbNames, (dbName) => {
  createPool(dbName)
})

// reload pool
function reloadPool (dbName) {
  try {
  } catch (error) {
    console.log('pool already closed')
  } finally {
    createPool(dbName)
  }
}

/* Execute query on postgresql server */
function select (qry, dbName) {
  let deferred = q.defer()

  if (!config[dbName]) {
    deferred.reject(['Invalid Project'])
  }

  if (qry === null) {
    return deferred.reject('No Query Found')
  }

  if (!pool[dbName] || pool[dbName].ending) {
    createPool(dbName)
  }

  pool[dbName].connect()
    .then(client => {
      client.query(qry)
        .then(res => {
          client.release()
          if (res.rowCount > 0) {
            deferred.resolve(res.rows)
          } else {
            deferred.reject({
              code: 200,
              error: 'no rows affected',
              data: res.rows
            })
          }
        })
        .catch(e => {
          client.release()
          console.error('query error in', e.message, e.stack)
          deferred.reject({
            code: 200,
            error: e.message
          })
        })
    }).catch(e => {
      console.error('query error out', e.message, e.stack)
      reloadPool(dbName)
      deferred.reject({
        code: 200,
        error: 'Internal Connection Error'
      })
    })
  return deferred.promise
}

// Exports
exports.select = select
