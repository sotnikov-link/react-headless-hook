import { memo, StrictMode } from 'react';
import * as space from '../public/space';
import { ExampleList, ExampleListProps } from '../utils/ExampleList';

const exampleListProps: ExampleListProps = {
  space,
  from: 'space.tsx',
  directory: '/',
};

const Index = memo(() => {
  return (
    <StrictMode>
      <h1>Hooks and Types for React Headless Components</h1>

      <h2>Components</h2>

      <ExampleList {...exampleListProps} order={[space.Button]} />

      <h2>Examples</h2>

      <ExampleList {...exampleListProps} order={[space.Empty, space.AsLink]} />
    </StrictMode>
  );
});

Index.displayName = 'Index';

export default Index;
