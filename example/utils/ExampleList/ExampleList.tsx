import { memo } from 'react';
import { OneExample, OneExampleProps } from './OneExample';

interface ExampleListProps extends Pick<OneExampleProps, 'directory'> {
  files: Record<OneExampleProps['file'], OneExampleProps['component']>;
}

export const ExampleList = memo<ExampleListProps>(({ directory, files }) => {
  return (
    <>
      {Object.entries(files).map(([file, Component]) => (
        <OneExample
          key={file}
          directory={directory}
          file={file}
          component={Component}
        />
      ))}
    </>
  );
});

ExampleList.displayName = 'ExampleList';

export default ExampleList;
