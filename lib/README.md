# Hook or Types for React Headless Components

## Installation

```bash
npm install react-headless-hook # yarn add react-headless-hook
```

### Motivation

- [Polymorphic Components (e.g. with as props)](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#polymorphic-components-eg-with-as-props)
- [react-polymorphic-box](https://github.com/kripod/react-polymorphic-box)
  - [issues](https://github.com/kripod/react-polymorphic-box/issues)
    - [displayName and propTypes are not allowed on forwardRef component](https://github.com/kripod/react-polymorphic-box/issues/22)
      - [react-polymorphic-types](https://github.com/kripod/react-polymorphic-types)
- [react polymorphic forward ref](https://www.google.com/search?q=react+polymorphic+forward+ref)
  - [Wanda Polymorphic](https://design.wonderflow.ai/develop/utilities/polymorphic)
    + [code](https://github.com/wonderflow-bv/wanda/blob/f723318efb27d5d03c77577ee469f6821dd9c1eb/packages/react-components/src/types/polymorphic/index.ts)
    - [Radix Polymorphic](https://www.radix-ui.com/docs/primitives/utilities/polymorphic)
      - [asChild](https://www.radix-ui.com/docs/primitives/overview/styling#changing-the-rendered-element)
        - [Slot](https://www.radix-ui.com/docs/primitives/utilities/slot)
          + [code](https://github.com/radix-ui/primitives/blob/1fac0d24829528d1a381169819a47e1ca2bd3805/packages/react/slot/src/Slot.tsx)
          - [org:radix-ui asChild](https://github.com/search?q=org%3Aradix-ui+asChild&type=issues)
            - [[All] Replace polymorphism with `asChild` prop](https://github.com/radix-ui/primitives/pull/835)
              - [Typing of props for children with Slots (asChild)](https://github.com/radix-ui/primitives/discussions/1341)
                - [Prop types for children of slottable (asChild) components](https://github.com/radix-ui/primitives/issues/895)
            - [Dedicated `asChild` page](https://github.com/radix-ui/website/issues/269)
- [Stitches. Composing Components](https://stitches.dev/docs/composing-components)
  - ["Too complex" union type is created when composing and using `as` prop](https://github.com/stitchesjs/stitches/issues/1044)
  - [Is stitches still under maintenance??](https://github.com/stitchesjs/stitches/issues/1026)
  - [compose component not support "as" prop](https://github.com/stitchesjs/stitches/issues/979)
  - [When using the "css" prop, locally should scoped tokens ignore 'undefined' values?](https://github.com/stitchesjs/stitches/issues/978)
  - [[FR] Static Extraction](https://github.com/stitchesjs/stitches/issues/955)
    - [vanilla-extract](https://github.com/seek-oss/vanilla-extract)
