# HeyDoctor Challenge - Task Queue

Welcome to HeyDoctor's interview challenge! You'll be using this repository as a foundation to implement a task queue that consists of scraping tasks which store the response of requesting the given URL.

Your teammate has already implemented the groundwork for the frontend and backend, however there are some key features and enhancements which you will be adding. Since they may be working on other features in the meantime, you should work on a branch and keep your changes small and relevant to the task at hand.


## Your Tasks:
* Feature: Tasks should now fetch the response from a URL.
  - Tasks should additionally have a URL and response field.
  - There should be a background worker process that waits for new and incomplete tasks, sends a GET request to the task URL, and updates the task status, updatedAt, and response field.
    - The task status value should be 'executing' while the HTTP request is in flight, 'success' if the HTTP response is a 2xx, and 'error' if the HTTP resonse is a 4xx or 5xx.
    - The task response value should be the body of the HTTP response.
    - The task updatedAt value should be changed any time the task is changed.
  - The frontend should periodically update to show the progress of tasks as the background worker picks them up and processes them.
  - The frontend should no longer allow the ability to manually "run" tasks.

* Feature: The frontend should have a toggle to show either pending tasks or completed/failed tasks.

* Feature: Add the concept of retrying failed requests.
  - The background worker should automatically retry failed requests up to 3 times after a 10 second pause.
  - The frontend should display the retry count.
  - The frontend should be able to trigger manual retries for tasks which failed 3 times.

## Development

### Running the client

```bash
npm run dev
```

This will start the Webpack Dev Server that serves assets in the `/src` directory (it will refresh the page on changes)

You can then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running the API server

```bash
npm run db:sync
npm run dev:server
```

This will start an [express](https://expressjs.com/) server on [http://localhost:5000](http://localhost:5000).

### Updating Database Schema

After modifying the database schema you can `npm run db:sync` again to have the changes applied.

## Testing

```bash
npm run test
```

Runs the test watcher in an interactive mode.
By default, runs tests related to files changed since the last commit.

### Helpful References
* Web framework docs: https://expressjs.com/en/4x/api.html
* ORM docs: http://docs.sequelizejs.com/
* React docs: https://reactjs.org/docs/react-api.html
* Component library source and docs: https://github.com/heydoctor/molekule/
* Helper site to generate various HTTP status codes and timeouts: https://httpstat.us/
