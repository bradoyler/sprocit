![log](https://user-images.githubusercontent.com/425966/40876689-9c5cf2f4-6647-11e8-8b79-85822a3d1221.png)
<span style="font-size:2em;">Sproc it</span>
<hr>

***Sproc it*** is a Promise-based API for executing SQL stored procedures _(for Nodejs)_

> Work it, Sproc it, Do it, Make us  
🎼 ...   
Harder, Better, Faster, Stronger

### Install
```
npm i sprocit 
```

### Create your config

```js
const config = {
  provider: 'mssql', // only provider, for now
  user: 'dbuser',
  password: '---',
  server: 'localhost',
  database: 'master',
  options: {
    encrypt: false // true, for using Azure
  }
}
```

### Execute your Sproc

```js
const sp = require('sprocit').create(config)
const params = [{name: 'id', type: 'Int', value: 1}]

sp.connect()
  .then(exec => {
    exec('getItems', params)
      .then(console.log) // logs results
  })
```

See [tests](test/index.js) for  advanced usage

TODO:
- PostgreSQL support
- mocha tests
- examples
