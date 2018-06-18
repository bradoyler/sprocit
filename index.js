const sql = require('mssql')

function requestThunk (pool) {
  function exec (name, params = []) {
    const req = pool.request()
    params.forEach(p => {
      if (p.type) {
        req.input(p.name, sql[p.type], p.value)
      } else {
        req.input(p.name, p.value)
      }
    })
    return req.execute(name)
  }

  function query (query, params = []) {
    const req = pool.request()
    params.forEach(p => {
      req.input(p.name, sql[p.type], p.value)
    })
    return req.query(query)
  }

  return { exec, query }
}

class Sprocit {
  constructor (config) {
    this.config = config // TODO: make password a private field
    this.pool = null
  }

  static create (config) {
    return new Sprocit(config)
  }

  connect (config = this.config) {
    if (this.pool && this.pool._connected) {
      return Promise.resolve(requestThunk(this.pool))
    }

    if (this.pool && !this.pool._connected) {
      sql.close() // auto-close global connection
    }

    return sql.connect(config)
      .then(pool => {
        this.pool = pool
        return requestThunk(pool)
      })
  }

  close () {
    sql.close()
  }
}

module.exports = Sprocit
