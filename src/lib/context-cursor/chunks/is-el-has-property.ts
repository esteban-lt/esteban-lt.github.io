import propNames from "../prop-names";

const isElHasProperty = (el: HTMLElement, property: string) =>
  el.getAttribute(propNames.dataAttr)?.includes(property) ?? false;

export default isElHasProperty;
