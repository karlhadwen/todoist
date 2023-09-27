## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

Todoist is a web application designed for note-taking, organizing information, and creating to-do lists.

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this tutorial, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

![Preview](todoist-preview.png?raw=true)

## Features

- **Add new task and time**: Add new todo task and due date into the current todo list
- **Add additional project categories**: Customize todo list based off of different projects
- **Time tracking**: Customize todo list based off the urgency of the task
- **Dark Mode**: Toggle between light and dark mode 

## Installation
Before doing these steps please install [Node.JS](https://nodejs.org/en) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). 

1. Clone the repository
```
git clone https://github.com/karlhadwen/todoist.git
```

2. Move to the working directory
```
cd todoist
```

3. Install all the dependencies
```
npm install (or npm i)
```

4. Run the react app 
```
npm start
```

Go to `localhost:3000` to view the application.

## Testing
For frontend component testing we use the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

1. Install the React Testing Library
```
npm install @testing-library/react
```

2. Run tests and code coverages 
```
npm test
```
This will show how much line of code is being covered by tests and how much tests are passed.


## Contributing 

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!
