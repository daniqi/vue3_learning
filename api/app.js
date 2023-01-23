const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req, res) => {
//   res.send('Hello World!')
// send json
  res.end(JSON.stringify({ a: 1 }, null, 3));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
