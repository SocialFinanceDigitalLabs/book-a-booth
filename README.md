# Social Finance's Book-A-Booth

This is a small, React-based app to makes it easier to find a 
free Zoom booth and book it. Rather than opening multiple calendars,
or adding several schedules, this app shows booth availability as a heat
map and allows booking of booths through a one-click (well, two click) 
approach. 

This project is entirely "homemade" and contributions are very welcome!

You don't need to know how to code to get involved. Suggestions for improvements,
user interface ideas, bug reports, every little suggestion will help us make
this tool better and booking booths easier. 

If you have a suggested improvement, please submit them in our issues log. 

## Join in the coding

![Build and Deploy](https://github.com/SocialFinanceDigitalLabs/book-a-booth/actions/workflows/deploy.yaml/badge.svg)

This project was bootstrapped with [Create React App][create-react-app] which is 
a simple way of getting started with React. It's a great way to quickly get started
if you want to play around in a blank project. You can see the start in the
[first commit][gh-first-light].

Next, since this project requires logging in with Microsoft Office 365 and Microsoft
have generously provided great sample applications for a range of different
scenarios, I copied in the 
[MS Authentication Layer React Router sample][msal-react-router]. You can (and try)
this version in [commit b1cac][gh-msal].

## What do I need?

Patience. And a few tools. Most importantly you need [Node.js][node]. Follow the links
to download a recent version of Node and install this.

Next, I highly recommend using [Yarn][yarn] for dependency management. Once you have 
working Node version installed, installing Yarn should be as easy as:

```shell
npm install -g yarn
```

Now you are ready to check out this project. If you're not familiar with GIT, try
one of the many tutorials available online. For windows, I can recommend 
[this one][git-tutorial].

Once you have checked out this repository, install the required libraries:

```shell
yarn install
```

and then you are ready to launch the project itself:

```shell
yarn start
```

After a few seconds you should see a message like this:

```
Compiled successfully!

You can now view book-a-booth in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.86.31:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

The application may also automatically pop-up in your browser. You're now ready to start
coding!


[react]: https://reactjs.org/
[create-react-app]: https://github.com/facebook/create-react-app
[msal-react-router]: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-react-samples/react-router-sample
[node]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[git-tutorial]: https://www.computerhope.com/issues/ch001927.htm

[gh-first-light]: https://github.com/SocialFinanceDigitalLabs/book-a-booth/tree/cc4e491da1237a12e022090da69485c74daafb4e
[gh-msal]: https://github.com/SocialFinanceDigitalLabs/book-a-booth/commit/b1cac92f519633124b0977972bd7c67b1cae067f