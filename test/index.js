const Sprocit = require('../index')
const config = require('../.mssql.json')

const sp = new Sprocit(config)

const params = [{name: 'id', type: 'Int', value: 1}]
const params2 = [{name: 'id', type: 'Int', value: 2}]

sp.connect()
  .then(exec => {
    exec('getItems', params)
      .then(res => {
        console.log('1st completed', res.recordset)
        return exec('getItems', params2)
      })
      .then(res => {
        console.log('2nd completed', res.recordset)
        return exec('getItems', params)
      })
      .then(res => {
        console.log('3rd completed', res.recordset)
        sp.close()
      })
      .catch(console.error)
  })
