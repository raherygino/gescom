import "framer-motion";

declare module "framer-motion" {
  interface MyMotionComponents {
    tr: import("framer-motion").MotionComponent<
      "tr",
      import("framer-motion").MotionStyle,
      import("framer-motion").HTMLMotionWithoutStyle &
        import("framer-motion").SVGAnimationDefinitions
    >;
  }
}

export {};
