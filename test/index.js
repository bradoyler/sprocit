const sql = require('mssql')
const config = require('./.mssql.json')

let mypool

sql.connect(config)
  .then(pool => {
    mypool = pool
    return pool.request()
      .input('id', sql.Int, 2)
      // .output('output_param', sql.VarChar(50))
      .execute('getItems')
  }).then(result => {
    console.log(result.recordset, '<<< recordset')
    // console.log(result.returnValue, '<<< returnValue')
    mypool.close()
  }).catch(err => {
    console.log(err)
    mypool.close()
  })
