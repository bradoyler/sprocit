const config = require('../.mssql.json')
const sp = require('../index').create()

const params = [{name: 'name', value: 'test'}]

sp.connect(config)
  .then(db => {
    db.exec('findItems', params)
      .then(res => {
        console.log('\n|---- Simple test', res)
        sp.close()
      })
      .catch(err => {
        console.error(err)
        sp.close()
      })
  })
  .catch(console.error)
