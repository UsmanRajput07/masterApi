import express from 'express';

const app = express();

// routes
app.get('/', (req, res, next) => {
  res.json({ message: 'hello world' });
});

export default app;
