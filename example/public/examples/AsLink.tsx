import { memo } from 'react';
import { useButton } from '../components/Button';

export const AsLink = memo(() => {
  const buttonProps = useButton({
    ref: null, // compatibility with any HTML-element
    kind: 'alert',
  });

  return (
    <a href="#your-url" {...buttonProps}>
      AsLink
    </a>
  );
});

AsLink.displayName = 'AsLink';
