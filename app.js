const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const Queue = require('bull');
const task = require('./task');

const app = express();
app.use(express.json());


const rateLimiterPerSecond = new RateLimiterMemory({
  points: 1, 
  duration: 1, 
});


const rateLimiterPerMinute = new RateLimiterMemory({
  points: 20, 
  duration: 60, 
});


const taskQueue = new Queue('tasks');


taskQueue.process(async (job) => {
  await task(job.data.user_id);
});


app.post('/api/v1/task', async (req, res) => {
  const { user_id } = req.body;

  try {

    await rateLimiterPerSecond.consume(user_id);
    await rateLimiterPerMinute.consume(user_id);


    taskQueue.add({ user_id });

    res.status(200).json({ message: 'Task added to the queue' });
  } catch (err) {
    res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
