# ideal-spork <img src="https://travis-ci.org/abrahammie/ideal-spork.svg?branch=master">
An _ideal_ task manager.

Getting Started
------------------------------

### Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system. (N.B. it's already included as part of Docker for Mac and Windows installs.)


### Speedy Set Up, Courtesy of Docker

1. Fork and clone this repo to your local machine
2. Initialize and start the app from the root of the cloned repo's directory with docker:

```
$ docker-compose up // -d for detached mode if you don't want to see logs
```

You can now see the app at http://localhost:8080.

3. Stop the app with:

```
$ docker-compose down
```


### Running tests

```
$ docker-compose -f docker-compose.test.yml up --build
```

This command builds images and starts containers for the services listed in docker-compose.test.yml file, running tests via the `sut` service.


Tech used
------------------------------

The **web** service is built with [React](https://reactjs.org/docs/hello-world.html), transpiled with [Babel](https://babeljs.io/docs/setup/), and bundled with [Webpack](https://webpack.js.org/concepts/) on an [Nginx](https://nginx.org/en/docs/) server.

The **tasks** service is built with [Node](https://nodejs.org/en/docs)/[Express](https://expressjs.com/en/4x/api.html).

Tasks are stored in a [Mongo](https://docs.mongodb.com/) database.

Tests are created with [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) and [Enzyme](http://airbnb.io/enzyme/docs/api/).


Functionality
------------------------------

Ideal-spork allows a user to create a task by providing a task name, description, and due date. Upon submit, the new task is stored in a persistent mongo database.

Tasks can be viewed as a list, displaying each task's name, description, and due date. The task list can be filtered by "Due Today or Tomorrow", "Overdue", or "Completed".

Tasks can be marked as completed if they are not already, and can also be deleted.

An alert appears when tasks are due soon (today and/or tomorrow) or overdue. Additionally, tasks are yellow if due soon or red if overdue.
