"use strict";

var e = React.createElement;
function Component() {
  var text = "Hello";
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      null,
      text
    )
  );
}

var domContainer = document.querySelector("#markerContents");
ReactDOM.render(e(Component), domContainer);