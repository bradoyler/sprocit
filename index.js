const sql = require('mssql')

function requestMiddleware (pool) {
  return (name, params) => {
    const req = pool.request()
    params.forEach(p => {
      req.input(p.name, sql[p.type], p.value)
    })
    return req.execute(name)
  }
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
    return sql.connect(config)
      .then(pool => {
        this.pool = pool // needed to close connection
        return requestMiddleware(pool)
      })
  }

  close () {
    this.pool.close()
  }
}

module.exports = Sprocit
