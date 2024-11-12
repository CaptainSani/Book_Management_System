const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const {user, book}= require('./models');
const auth = require('./controller/authController')

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/books', bookRoutes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

