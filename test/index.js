const Sprocit = require('../index')
const config = require('../.mssql.json')

const sprocit = new Sprocit(config)

const params = [{name: 'id', type: 'Int', value: 1}]
const params2 = [{name: 'id', type: 'Int', value: 2}]

sprocit.exec('getItems', params)
  .then(results => {
    console.log('1st completed', results.recordset)
    return sprocit.exec('getItems', params2)
  })
  .then(results => {
    console.log('2nd completed', results.recordset)
    return sprocit.exec('getItems', params)
  })
  .then(results => {
    console.log('3rd completed', results.recordset)
    sprocit.close()
  })
  .catch(console.log)
