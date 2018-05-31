const config = require('../.mssql.json')
const sp = require('../index').create(config)

const params = [{name: 'id', type: 'Int', value: 1}]

sp.exec('getItems', params)
  .then(console.log)
  .catch(console.log)
