# Typeform's Challenge
Mamon, although being a dog, is one of the most valuable members of Typeform's team. Our challenge here is to setup a HTTP client which will seamlessly consume a remote REST service in order to discover what food is Mamon's favorite meal!

## General approach
When envisioning this application for the fist time right after reading the spec I came up with different possible workarounds for the challenge: I might create a HTML-based UI spiced up with some Javascript for handling the HTTP connections by leveraging libraries such as Zepto or Fetch. Or perhaps it would be more feasible to undertake an implementation coded on top of a SPA framework with built-in HTTP functionalities out-of-the-box such as Backbone or Angular.

Eventually I realized that the best approach had to be uber simplistic and given the fact the spec didn't include any requirements in regards of attaching a functional GUI, I concluded that the user interaction with the application should be reduced to a bare minimum. With this said, setting aside all the CSS and HTML clutter and focusing on a pure Javascript-driven app managed by the shell CLI required to make a call in regards of picking a module architecture of choice.

 In order to keep simplicity to the max, I discarded ES6 so no transpiler should be required to deploy the app (keeping the code footprint to the minimum). On the other hand, and since using the command line seemed to be the only alternative left, AMD modules were disregarded in order to focus on CommonJS as the module architecture of choice, so the whole thing could be easily executed (and tested!) by leveraging the Node.js CLI with no hassle whatsoever.

### In summary:

* The application must retrieve some basic auth data from a service, digest such data and reuse it to fetch a final response from a HTTP endpoint defined by this digested data.
* According to the above, the application module API should expose an auth data fetch method, a sum/reduce method to digest the parts of the auth data that define the final answer endpoint and a method to ping such API service, wrapping around the previous utility methods. In fairness, we are good to go with just the latter, but in my mind this app is all about 3 steps (auth-digest-consume_answer) and exposing those methods helped me out building the whole thing from the ground up following a TDD methodology.
* No browser compatibility is observed, therefore the app must be fully browser-agnostic.
* No HTML or CSS are included, in order to focus on the HTTP connection mechanics.
* CommonJS is the module architecture of choice, in order to ease deployment on any machine provided with NPM and Node.js and better handle the dependency management.
* The whole thing is built around the `lib/client.js` module. For your convenience an `index.js` file has been provided containing a full deployment of such module with support for executing its 2 interfaces (either Promises or Callbacks).

## Application deployment and execution

### Application setup

The module makes use of the Q framework to provide support for Promises. That is the only required dependency since all the other functionalities are handled by native Node.js modules. Installing that dependency and the development tools aide is required in order to proceed.

```bash
$ npm install
```
**Please note**: Mac OS users might require ```sudo``` privileges.

### Running the application with the Node.js CLI
An `index.js` file implementing the logic required to execute `lib/client` has been included at the root folder for your convenience. Please open it to assess the client's interface. When executing this file we go full-cycle through the API and print the API output on screen, conveniently decorated with some console context header.

```bash
$ node index
```
All asyncronous methods implement both a Promise-based interface or a classical callback interface, although both operate equal when fetching and submitting data. You can try the callback-based interface form the CLI by executing the code below:

```bash
$ node index callback_ui
```

### Running the tests
A full test suite has been provided leveraging Mocha as test framework and Chai to handle assertions. Some plugin extends Chai in order to provide a better syntax for Promises-based methods. In order to run the test just type the following:

```bash
$ npm test
```
Right after running the tests, a code coverage report will be saved and displayed in your default browser.

## ISC License

Copyright (c) 2015, Pablo Deeleman <deeleman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
