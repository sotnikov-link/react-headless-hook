import { ComponentPropsWithRef, useCallback } from 'react';
import { useHeadless as getHeadlessHook, passRef } from 'use-headless';

export interface ButtonOwnProps {
  kind?: 'simple' | 'alert';
}

export const useButton = getHeadlessHook<'onClick' | 'style', ButtonOwnProps>(
  ({ ref, onClick, style, kind = 'simple' }) => {
    const handleClick = useCallback<NonNullable<typeof onClick>>(
      (event) => {
        onClick && onClick(event);
        kind === 'alert' && window.alert('bang');
      },
      [kind, onClick]
    );

    return {
      ref,
      onClick: handleClick,
      style: {
        ...(kind === 'alert' && { background: 'lightpink' }),
        ...style,
      },
    };
  }
);

export interface ButtonProps
  extends ButtonOwnProps,
    ComponentPropsWithRef<'button'> {}

export const Button = passRef<ButtonProps>(({ kind, ...restProps }, ref) => (
  <button
    type="button"
    {...useButton({ ref, kind })}
    {...restProps}
    ref={ref}
  />
));
