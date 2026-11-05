import { addCursor, setStyles } from "./chunks";
import contextMode from "./modes/context-mode";
import propNames from "./prop-names";
import type { CProps, CursorSettings } from "./types";

const contextCursor = (props: CProps = {}) => {
  const settings: CursorSettings = {
    radius: props.radius ?? 20,
    transitionSpeed: props.transitionSpeed ?? 0.16,
    parallaxIndex: props.parallaxIndex ?? 10,
    hoverPadding: props.hoverPadding ?? 6,
  };

  setStyles();
  const cCursor = addCursor(settings);

  const init = () => {
    const interactElements = document.querySelectorAll<HTMLElement>(
      `[${propNames.dataAttr}]`
    );
    contextMode(cCursor, settings, interactElements);
  };

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
};

export default contextCursor;
