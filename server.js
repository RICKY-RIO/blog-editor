const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://sajarikhith:YsJtzso7Gy876Gzo@cluster0.rcdh9qm.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('DB Connection Error:', err));

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  status: { type: String, default: 'draft' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.post('/api/blogs/save-draft', async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const blog = new Blog({
      title,
      content,
      status: status || 'draft',
      created_at: new Date(),
      updated_at: new Date(),
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
