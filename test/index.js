const Sprocit = require('../index')
const config = require('../.mssql.json')

const sp = new Sprocit(config)

const params = [{name: 'name', value: 'test1'}]
const params2 = [{name: 'id', type: 'Int', value: 2}]

sp.connect()
  .then(db => {
    db.exec('findItems', params)
      .then(res => {
        console.log('\n|---- EXEC 1 recordset:', res.recordset)
        return db.exec('getItem', params2)
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

function delayTest () {
  sp.connect()
    .then(db => {
      db.exec('findItems', params)
        .then(res => {
          console.log('\n|---- EXEC recordset: (delayed)', res.recordset)
          sp.close()
        })
        .catch(console.error)
    })
}

setTimeout(delayTest, 1200)
setTimeout(delayTest, 1200 + 50)
setTimeout(delayTest, 1200 + 100)
setTimeout(delayTest, 1200 + 150)
setTimeout(delayTest, 1200 + 200)
