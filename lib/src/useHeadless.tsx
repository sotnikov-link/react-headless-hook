import { HTMLAttributes, Ref } from 'react';

/**
 * Based on HTMLAttributes instead of AllHTMLAttributes.
 *
 * @see https://github.com/typescript-cheatsheets/react/issues/128#issuecomment-508103558
 * @see https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#definitely-not-reacthtmlprops-or-reacthtmlattributes
 */
type HTMLElementPropsWithoutRef<T extends HTMLElement> = HTMLAttributes<T>;

/**
 * It is not equal to React.PropsWithRef.
 * @see https://stackoverflow.com/q/66389272/4765837#comment117377785_66389272
 */
type PropsWithRef<T> = Partial<{ ref: Ref<T> }>;

interface HTMLElementPropsWithRef<T extends HTMLElement>
  extends HTMLElementPropsWithoutRef<T>,
    PropsWithRef<T> {}

interface RefRecord<T> {
  ref: T;
}

type Input<
  /**
   * Keys of Base Props which are needed for headless component.
   * Here without Ref: because ref can be always and this doesn't need
   * to define.
   */
  BasePropsKeysWithoutRef extends keyof HTMLElementPropsWithoutRef<BaseElement>,
  OwnProps extends object,
  BaseElement extends HTMLElement,
  RefValue extends Ref<BaseElement> // wip
> = OwnProps &
  RefRecord<RefValue> &
  Pick<HTMLElementPropsWithoutRef<BaseElement>, BasePropsKeysWithoutRef>;

type Output<
  /**
   * Keys of Base Props which are needed for headless component.
   * Here without Ref: because ref can be always and this doesn't need
   * to define.
   */
  BasePropsKeysWithoutRef extends keyof HTMLElementPropsWithoutRef<BaseElement>,
  BaseElement extends HTMLElement,
  RefValue extends Ref<BaseElement> // wip
> = Required<
  Pick<HTMLElementPropsWithoutRef<BaseElement>, BasePropsKeysWithoutRef>
> &
  /**
   * Required Ref but can be null when user don't give external ref and our
   * component doesn't use internal ref. It's required that Developer remembers
   * about it always and user has same UX of headless components.
   *
   * | external | internal | result |
   * |----------|----------|--------|
   * | 0        | 0        | 0      |
   * | 0        | 1        | 1      |
   * | 1        | 0        | 1      |
   * | 1        | 1        | 1      |
   */
  RefRecord<RefValue>;

/**
 * Zero-runtime Headless Component Hook
 *
 * @example
 *
 * ```tsx
 * type ButtonOwnProps = Partial<{ kind: 'simple' | 'flash' }>;
 *
 * type HeadlessButton = Headless<'onClick', ButtonOwnProps>;
 *
 * export type ButtonHeadlessProps = HeadlessButton['propsWithRef'];
 *
 * export function useButton<RefValue extends HeadlessButton['refValue']>({
 *   ref,
 *   kind = 'simple',
 *   onClick,
 * }: HeadlessInput<HeadlessButton, RefValue>) {
 *   type Result = HeadlessOutput<HeadlessButton, RefValue>;
 *
 *   const handleClick = useCallback<Result['onClick']>(
 *     (event) => {
 *       onClick && onClick(event);
 *       kind === 'flash' && window.alert(kind);
 *     },
 *     [kind, onClick]
 *   );
 *
 *   return useMemo<Result>(
 *     () => ({
 *       ref,
 *       onClick: handleClick,
 *     }),
 *     [handleClick, ref]
 *   );
 * }
 * ```
 */
export interface Headless<
  /**
   * Keys of Base Props which are needed for headless component.
   * Here without Ref: because ref can be always and this doesn't need
   * to define.
   */
  PropKeys extends keyof HTMLElementPropsWithoutRef<Element> = never,
  OwnProps extends object = object,
  Element extends HTMLElement = HTMLElement,
  RefValue extends Ref<Element> = Ref<Element> // wip
> {
  propKeys: PropKeys;
  ownProps: OwnProps;
  element: Element;
  refValue: RefValue;

  propsWithRef: OwnProps &
    Pick<HTMLElementPropsWithRef<Element>, 'ref' | PropKeys>;
}

export type HeadlessInput<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Headless<any>, // wip
  R extends T['refValue']
> = Input<T['propKeys'], T['ownProps'], T['element'], R>;

export type HeadlessOutput<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Headless<any>,
  R extends T['refValue']
> = Output<T['propKeys'], T['element'], R>;

export function useHeadless<
  /**
   * Keys of Base Props which are needed for headless component.
   * Here without Ref: because ref can be always and this doesn't need
   * to define.
   */
  PropKeys extends keyof HTMLElementPropsWithoutRef<Element>,
  OwnProps extends object,
  Element extends HTMLElement = HTMLElement,
  RefValue extends Ref<Element> = Ref<Element>, // wip
  HeadlessDefinition extends Headless<
    PropKeys,
    OwnProps,
    Element,
    RefValue
  > = Headless<PropKeys, OwnProps, Element, RefValue>
>(
  handle: (
    input: HeadlessInput<HeadlessDefinition, RefValue>
  ) => HeadlessOutput<HeadlessDefinition, HeadlessDefinition['refValue']>
) {
  return function <T extends HeadlessDefinition['refValue']>(
    input: HeadlessInput<HeadlessDefinition, T>
  ) {
    type Result = HeadlessOutput<HeadlessDefinition, T>;

    /**
     * Hack
     * @see https://stackoverflow.com/a/59363875/4765837
     */
    return handle(input) as Result;
  };
}
