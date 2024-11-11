const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/books', bookRoutes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});