const express = require('express');
const app = express();
const port = 3000;
const {readFile} = require('fs');

app.use(express.static('public'))

//listen to incoming requests
app.listen(port, () => {
  console.log(`App available on http://localhost:${port}`)
});
