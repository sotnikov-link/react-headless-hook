import {
  ElementRef,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

export function passRef<
  PropsWithRef extends object,
  Ref = RefTypeFromProps<PropsWithRef>
>(
  render: ForwardRefRenderFunction<Ref, PropsWithRef>
): ForwardRefExoticComponent<
  PropsWithoutRef<PropsWithRef> & RefAttributes<Ref>
> {
  return forwardRef<Ref, PropsWithRef>(render);
}

export type RefTypeFromProps<T extends object> = ElementRef<FC<T>>;

export type RefType<T> = RefTypeFromProps<{ ref: T }>;
