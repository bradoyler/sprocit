const Sprocit = require('../index')
const config = require('../.mssql.json')

const sp = new Sprocit(config)

const params = [{name: 'id', type: 'Int', value: 1}]
const params2 = [{name: 'id', type: 'Int', value: 2}]

sp.connect()
  .then(db => {
    db.exec('getItems', params)
      .then(res => {
        console.log('\n|---- EXEC 1 recordset:', res.recordset)
        return db.exec('getItems', params2)
      })
      .then(res => {
        console.log('|---- EXEC 2 recordset:', res.recordset)
        return db.query('select * from items')
      })
      .then(res => {
        console.log('|---- Query 1 recordset:', res.recordset)
        sp.close()
      })
      .catch(console.error)
  })
