# Sprocit
Promise-based API for calling MSSQL stored procedures (in Node) 
> ...like a boss

### Install
```
npm i sprocit 
```

### Create your config

```js
const config = {
  user: 'dbuser',
  password: '---',
  server: 'localhost',
  database: 'master',
  options: {
    encrypt: false // true, if using Azure
  }
}
```

### Execute your Sproc

```js
const sp = require('sprocit').create(config)
const params = [{name: 'id', type: 'Int', value: 1}]

sp.exec('getItems', params)
  .then(console.log) // logs results
```
See [tests](test/index.js) for  advanced usage