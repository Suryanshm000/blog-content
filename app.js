const express = require('express');

// express app
const app = express();

app.listen(3000, () => console.log("app is running at port 3000"))

// routes
app.get('/', (req, res) => {
  res.send("Hello this is blog content app")
});
