import { ComponentPropsWithRef, forwardRef, useCallback } from 'react';
import { useHeadless as getHeadlessHook } from 'use-headless';

export interface ButtonOwnProps {
  kind?: 'simple' | 'alert';
}

export const useButton = getHeadlessHook<'onClick' | 'style', ButtonOwnProps>(
  ({ ref, onClick, style, kind = 'simple' }) => {
    const handleClick = useCallback<NonNullable<typeof onClick>>(
      (event) => {
        onClick?.(event); // if external onClick exists
        // https://typescript-eslint.io/rules/prefer-optional-chain/

        kind === 'alert' && window.alert('boom');
      },
      [kind, onClick]
    );

    return {
      ref,
      onClick: handleClick,
      style: {
        font: 'inherit',
        color: 'black',
        padding: '0.5em 1em',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        textDecoration: 'none',
        ...(kind === 'alert' && { background: 'lightpink' }),
        ...style, // external style is more important than internal
      },
    };
  }
);

export interface ButtonProps
  extends ButtonOwnProps,
    ComponentPropsWithRef<'button'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ kind, ...restProps }, ref) => (
    <button
      type="button"
      {...useButton({ ref, kind })}
      {...restProps}
      ref={ref}
    />
  )
);

Button.displayName = 'Button';
