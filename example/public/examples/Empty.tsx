import { memo } from 'react';
import { Button } from '../components/Button';

export const Empty = memo(() => <Button>Empty</Button>);

Empty.displayName = 'Empty';
