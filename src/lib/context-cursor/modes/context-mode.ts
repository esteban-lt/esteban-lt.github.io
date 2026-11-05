import { gsap } from "gsap";
import { getMoveIndex, isElHasProperty, getStyleProp } from "../chunks";
import propNames from "../prop-names";
import type { CursorSettings } from "../types";

const contextMode = (
  cursor: HTMLElement,
  props: CursorSettings,
  interactElements: NodeListOf<HTMLElement>
) => {
  const parallaxSpeed = {
    cursor: props.parallaxIndex,
    target: props.parallaxIndex * 1.5,
  };
  let isHovered = false;
  let cursorTarget: HTMLElement | null = null;

  const animate = (target: gsap.TweenTarget, vars: gsap.TweenVars) =>
    gsap.to(target, {
      duration: props.transitionSpeed,
      overwrite: "auto",
      ...vars,
    });

  const getBorderRadius = (el: HTMLElement) =>
    parseFloat(window.getComputedStyle(el).borderRadius) || 0;

  const moveCursor = (e: MouseEvent) => {
    // If element is not hovered
    if (!isHovered || !cursorTarget) {
      animate(cursor, {
        x: e.clientX - props.radius / 2,
        y: e.clientY - props.radius / 2,
      });
      // If element is hovered
    } else {
      const target = cursorTarget;
      const rect = target.getBoundingClientRect();
      const borderRadius = getBorderRadius(target);
      const noPadding = isElHasProperty(target, propNames.noPadding);
      const noParallax = isElHasProperty(target, propNames.noParallax);
      const padding = noPadding ? 0 : props.hoverPadding;

      // For "LIFT" mode
      if (isElHasProperty(target, propNames.lift)) {
        animate(target, {
          x: getMoveIndex(
            e.clientX,
            rect.left,
            target.clientWidth,
            parallaxSpeed.target
          ),
          y: getMoveIndex(
            e.clientY,
            rect.top,
            target.clientHeight,
            parallaxSpeed.target
          ),
          scale: 1.1,
          boxShadow: getStyleProp("--ghost-shadow"),
        });
        animate(cursor, {
          filter: "blur(8px)",
          x:
            rect.left +
            (e.clientX - rect.left - target.clientWidth / 2) /
              parallaxSpeed.cursor,
          y:
            rect.top +
            (e.clientY - rect.top - target.clientHeight / 2) /
              parallaxSpeed.cursor,
          backgroundImage: `radial-gradient(circle at ${
            e.clientX - rect.left
          }px ${
            e.clientY - rect.top
          }px, rgba(255,255,255,0.4), rgba(255,255,255,0))`,
        });
        // For default "PARALLAX" mode
      } else {
        animate(cursor, {
          x:
            rect.left -
            padding +
            (noParallax
              ? 0
              : (e.clientX - rect.left - target.clientWidth / 2) /
                parallaxSpeed.cursor),
          y:
            rect.top -
            padding +
            (noParallax
              ? 0
              : (e.clientY - rect.top - target.clientHeight / 2) /
                parallaxSpeed.cursor),
          borderRadius: borderRadius * (noPadding ? 1 : 1.5),
          width: target.clientWidth + padding * 2,
          height: target.clientHeight + padding * 2,
        });
        // For "NO PARALLAX" property
        if (!noParallax) {
          animate(target, {
            x: -getMoveIndex(
              e.clientX,
              rect.left,
              target.clientWidth,
              parallaxSpeed.target
            ),
            y: -getMoveIndex(
              e.clientY,
              rect.top,
              target.clientHeight,
              parallaxSpeed.target
            ),
          });
        }
      }
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    isHovered = true;
    cursorTarget = target;

    if (isElHasProperty(target, propNames.lift)) {
      cursor.classList.add("c-cursor-lift_active");
      animate(cursor, {
        borderRadius: getBorderRadius(target),
        width: target.clientWidth,
        height: target.clientHeight,
        scale: 1.1,
      });
    } else {
      cursor.classList.add("c-cursor_active");
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    isHovered = false;
    cursor.classList.remove("c-cursor_active");
    cursor.classList.remove("c-cursor-lift_active");

    animate(cursor, {
      x: e.clientX - props.radius / 2,
      y: e.clientY - props.radius / 2,
      width: props.radius,
      height: props.radius,
      borderRadius: "100px",
      scale: 1,
      backgroundImage: "none",
      filter: "blur(0px)",
    });
    if (!cursorTarget) return;

    animate(cursorTarget, {
      x: 0,
      y: 0,
      scale: 1,
      ...(isElHasProperty(cursorTarget, propNames.lift)
        ? { boxShadow: "0 7px 15px rgba(0,0,0,0.0)", clearProps: "boxShadow" }
        : {}),
    });
  };

  // Event listeners
  document.addEventListener("wheel", handleMouseOut);
  document.addEventListener("mousemove", moveCursor);

  interactElements.forEach((item) => {
    item.addEventListener("mouseenter", handleMouseOver);
    item.addEventListener("mouseleave", handleMouseOut);
  });
};

export default contextMode;
