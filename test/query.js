const config = require('../.mssql.json')
const sp = require('../index').create()

sp.connect(config)
  .then(db => {
    db.query('select * from items')
      .then(res => {
        console.log('\n|---- Query test', res.recordset)
        sp.close()
      })
      .catch(err => {
        console.error(err)
        sp.close()
      })
  })
