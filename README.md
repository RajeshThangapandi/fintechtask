
```markdown
# Node.js Task Queueing System with Rate Limiting

## Overview
This Node.js application implements a task queueing system with user-specific rate limiting. The system ensures that:
- **Each user can process one task per second.**
- **Each user can process up to twenty tasks per minute.**

Tasks are added to a queue, processed according to these limits, and logged to a file upon completion. The application uses clustering to improve performance and reliability.

## Prerequisites
Before running this application, ensure you have the following installed:
- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **PM2** (Process Manager for Node.js)

## Installation

### 1. Clone the Repository
First, clone the project repository to your local machine:
```bash
git clone https://github.com/your-username/fintechtask.git && cd node-task-queue
```

### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

### 3. Install PM2 Globally
PM2 is necessary to run the application in cluster mode. Install it globally using npm:
```bash
npm install -g pm2
```

## Running the Application

### 1. Start the Application
Use PM2 to start the application with two instances (replicas) for better performance:
```bash
pm2 start app.js -i 2
```
This command will start two instances of the application using clustering.

### 2. Monitor the Application
You can monitor the application using the following PM2 commands:
```bash
pm2 logs    # View real-time logs 
pm2 status  # Check the status of the application
```

## Testing the API

### 1. Send a POST Request
To test the API, you can use `curl` or any API testing tool (like Postman). Here's how to send a POST request using `curl`:

```bash
curl -X POST http://localhost:3000/api/v1/task -H "Content-Type: application/json" -d '{"user_id":"123"}'
```

### 2. Expected Responses
- **Success:** If the task is successfully added to the queue, you'll receive the following response:
  ```json
  {"message":"Task added to the queue"}
  ```
- **Rate Limit Exceeded:** If the rate limit for a user is exceeded, you'll receive:
  ```json
  {"message":"Rate limit exceeded. Please try again later."}
  ```

### 3. Check Task Logs
Task completion details are logged in the `task_log.txt` file in the project directory. Each entry includes the user ID and a timestamp of when the task was completed.

## Stopping the Application

To stop the application, use the following PM2 command:
```bash
pm2 stop app.js
```

## Additional PM2 Commands
- **Restart the Application:**
  ```bash
  pm2 restart app.js
  ```
- **Delete the Application from PM2:**
  ```bash
  pm2 delete app.js
  ```

# fintechtask
