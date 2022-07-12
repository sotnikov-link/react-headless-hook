import { Fragment, memo, ReactNode } from 'react';
import { Button } from '../components';

const examples: Record<string, (title: string) => ReactNode> = {
  Empty: (title) => <Button>{title}</Button>,

  'Custom onClick': (title) => (
    <Button
      onClick={(event) => {
        alert(title + ' by ' + event.currentTarget.tagName);
      }}
    >
      {title}
    </Button>
  ),

  'Kind Alert': (title) => <Button kind="alert">{title}</Button>,
};

export const Examples = memo(() => (
  <>
    {Object.entries(examples).map(([key, value]) => (
      <Fragment key={key}>
        <p>{value(key)}</p>
      </Fragment>
    ))}
  </>
));

Examples.displayName = 'Examples';
