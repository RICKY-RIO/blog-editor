const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/blogs/save-draft', (req, res) => {
  res.json({ message: 'It works!' });
});

app.listen(5000, () => {
  console.log('Test server running on port 5000');
});
