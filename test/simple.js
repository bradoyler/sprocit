const config = require('../.mssql.json')
const sp = require('../index').create()

const params = [{name: 'id', type: 'Int', value: 2}]

sp.connect(config)
  .then(db => {
    db.exec('getItems', params)
      .then(res => {
        console.log('\n|---- Simple test', res)
        sp.close()
      })
      .catch(err => {
        console.error(err)
        sp.close()
      })
  })
