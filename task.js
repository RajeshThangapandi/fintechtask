const fs = require('fs');
const path = require('path');

async function task(user_id) {
  const logMessage = `${user_id}-task completed at-${new Date().toISOString()}\n`;
  fs.appendFileSync(path.join(__dirname, 'task_log.txt'), logMessage);
}

module.exports = task;
