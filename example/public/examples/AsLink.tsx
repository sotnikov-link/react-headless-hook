import { memo } from 'react';
import { useButton } from '../components/Button';

export const AsLink = memo(() => {
  const buttonProps = useButton({ ref: null, kind: 'alert' });

  return (
    <a href="#your-url" {...buttonProps}>
      {AsLink.displayName}
    </a>
  );
});

AsLink.displayName = 'AsLink';
