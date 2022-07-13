import { memo } from 'react';
import { Button } from '../components/Button';

export const Empty = memo(() => <Button>{Empty.displayName}</Button>);

Empty.displayName = 'Empty';
