const Sprockit = require('../index')
const config = require('../.mssql.json')

const sprockit = new Sprockit(config)

const params = [{name: 'id', type: 'Int', value: 1}]
const params2 = [{name: 'id', type: 'Int', value: 2}]

sprockit.exec('getItems', params)
  .then(results => {
    console.log('1st completed', results.recordset)
    return sprockit.exec('getItems', params2)
  })
  .then(results => {
    console.log('2nd completed', results.recordset)
    return sprockit.exec('getItems', params)
  })
  .then(results => {
    console.log('3rd completed', results.recordset)
    sprockit.close()
  })
  .catch(console.log)
