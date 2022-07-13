import { memo } from 'react';
import { Button } from '../components/Button';

export const CustomOnClick = memo(() => (
  <Button
    onClick={(event) => {
      alert('Click by ' + event.currentTarget.tagName);
    }}
  >
    {CustomOnClick.displayName}
  </Button>
));

CustomOnClick.displayName = 'CustomOnClick';
