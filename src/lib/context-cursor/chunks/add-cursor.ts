import type { CursorSettings } from "../types";

const addCursor = (props: CursorSettings) => {
  const contextCursor = document.createElement("div");
  contextCursor.setAttribute(
    "style",
    `transform: translate(-200px, -200px); height: ${props.radius}px; width: ${props.radius}px;`
  );
  contextCursor.setAttribute("class", "c-cursor");
  document.body.prepend(contextCursor);
  return contextCursor;
};

export default addCursor;
