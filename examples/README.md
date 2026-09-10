# Cycle.js Examples

Browse and learn from examples of small Cycle.js apps using Core, DOM Driver, HTML Driver, HTTP Driver, JSONP Driver, and others.

## Usage

1.  Open the directory of an example in your terminal.
2.  Type `npm start`
3.  Open the `index.html` of that example in your browser, with the full path, e.g. `file:///Users/myself/cycle-examples/jsx-seconds-elapsed/index.html`

## Example reference

Examples are grouped by the amount of Cycle.js knowledge they assume. Start
with `basic/hello-world`, then follow the rows in order within each section.

### Basic

| Example | What it demonstrates |
| --- | --- |
| `hello-world` | A minimal `main` function, a DOM sink, and mounting with `run`. |
| `checkbox` | Reading a DOM event stream and rendering state derived from it. |
| `counter` | Merging increment and decrement intents into accumulated state. |
| `jsx-seconds-elapsed` | JSX as an alternative syntax for virtual DOM nodes. |
| `http-random-user` | Sending an HTTP request and flattening the response metastream. |
| `bmi-naive` | Combining independent input streams into a calculated view. |

### Intermediate

| Example | What it demonstrates |
| --- | --- |
| `hello-lastname` | Composing a child component and mapping its sinks. |
| `bmi-typescript` | A typed Cycle.js application with typed sources and sinks. |
| `tsx-seconds-elapsed` | TypeScript and TSX virtual DOM rendering. |
| `http-search-github` | Debounced input, HTTP categories, and concurrent requests. |
| `animation` | Frame-based animation coordinated through the Time driver. |

### Advanced

| Example | What it demonstrates |
| --- | --- |
| `bmi-nested` | Nested components and isolation of repeated controls. |
| `nested-folders` | Organizing isolated components across multiple modules. |
| `many` | Efficiently rendering and updating a large dynamic collection. |
| `animated-letters` | Coordinating keyed list transitions and animations. |
| `autocomplete-search` | Cancellation, debouncing, and asynchronous suggestions. |
| `routing-view` | Browser history, route matching, and view selection. |
| `custom-driver` | Building a driver around an imperative chart API. |
| `isomorphic` | Sharing an app between server-side HTML and browser DOM drivers. |

The examples intentionally stay small. Read each `src` directory together
with its `package.json` to see which drivers and stream operators it uses.
