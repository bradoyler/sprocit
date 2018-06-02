const config = require('../.mssql.json')
const sp = require('../index').create()

const params = [{name: 'id', type: 'Int', value: 2}]

sp.connect(config)
  .then(exec => {
    exec('getItems', params)
      .then(res => {
        console.log('Simple test', res)
        sp.close()
      })
      .catch(err => {
        console.error(err)
        sp.close()
      })
  })
