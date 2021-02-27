"use strict";

const e = React.createElement;
function Component() {
  let text = "Hello";
  return (
    <div>
      <button>{text}</button>
    </div>
  );
}

const domContainer = document.querySelector("#markerContents");
ReactDOM.render(e(Component), domContainer);
