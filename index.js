const sql = require('mssql')

function execWithPool (pool, name, params) {
  const req = pool.request()
  params.forEach(p => {
    req.input(p.name, sql[p.type], p.value)
  })
  return req.execute(name)
}

class Sprocit {
  constructor (config) {
    this.config = config
    this.pool = null
  }

  exec (name, params) {
    if (this.pool) {
      return execWithPool(this.pool, name, params)
    } else {
      return sql.connect(this.config)
        .then(pool => {
          this.pool = pool
          return execWithPool(pool, name, params)
        })
    }
  }

  close () {
    this.pool.close()
  }
}

module.exports = Sprocit
