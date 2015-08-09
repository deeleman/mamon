# Typeform's Challenge
Mamon, although being a dog, is one of the most valuable members of Typeform's team. Our challenge here is to setup a HTTP client which will seamlessly consume a remote REST service in order to discover what food is Mamon's favorite meal!

## General approach
When envisioning this application for the fist time right after reading the spec I came up with different possible workarounds for the challenge: I might create a HTML-based UI spiced up with some Javascript for handling the HTTP connections by leveraging libraries such as [Zepto.js](http://zeptojs.com/) or [Fetch](https://github.com/github/fetch). Or perhaps it would be more feasible to undertake an implementation coded on top of a SPA framework with built-in HTTP functionalities out-of-the-box such as Backbone or Angular.

Eventually I realized that the best approach had to be super simplistic and given the fact the spec didn't include any requirements in regards of attaching a functional GUI, I concluded that the user interaction with the application could be reduced to a bare minimum. With this said, setting aside all the CSS and HTML clutter and focusing on a pure Javascript-driven app managed by the shell CLI required to make a call in regards of picking a module architecture of choice.

AMD modules were discarded in order to focus on CommonJS as the module architecture of choice, so the whole thing could be easily executed (and tested!) by leveraging the Node.js CLI with no middleman libraries whatsoever. The whole thing is built around the `lib/client.js` module. For your convenience an `index.js` file has been attached containing a sample implementation of such module with support for executing the 2 interfaces it provides (either Promises or Callbacks).

According to the API workflow, the application module API should expose a token data fetch method, a sum/reduce method to digest the parts of the auth data that define the final answer endpoint and a method to ping such API service, wrapping these previous utility methods. In fairness, we are good to go with just the latter, but in my mind this app is all about 3 steps (auth-digest-consume_answer) and exposing those methods publicly helped me out building the whole thing from the ground up following a TDD methodology.

## Application deployment and execution

### Application setup

The module makes use of the [Q framework](https://github.com/kriskowal/q) to provide support for Promises. That is the only required dependency since all the other functionalities are handled by native Node.js modules. Installing that dependency is required in order to proceed. The install command will proceed to install the development dependencies as well.

```bash
$ npm install
```
**Please note**: Mac OS users might require ```sudo``` privileges.

### Running the application with the Node.js CLI
An `index.js` file implementing the logic required to execute `lib/client` has been included at the root folder for your convenience. Please open it to assess the client's interface. When executing this file we go full-cycle through the API and print the API output on screen, conveniently decorated with some console context header for sample purposes.

```bash
$ node index
```
All asynchronous methods implement both a Promise-based interface or a classical Callback interface, although both return the same output when fetching and submitting data. You can try the callback-based interface form the CLI by executing the code below:

```bash
$ node index callback_ui
```

### Running the tests
A full test suite has been provided leveraging Mocha as test framework and Chai to handle assertions. Some plugin extends Chai in order to provide a better syntax for Promises-based methods. In order to run the test just type the following:

```bash
$ npm test
```
Right after running the tests, a code coverage report will be saved onto the project workspace and launch in your default browser.

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
