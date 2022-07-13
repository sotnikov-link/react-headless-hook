import { memo, StrictMode } from 'react';
import { ExampleList } from '../containers/ExampleList';
import { Button } from '../public/components/Button';
import { AsLink } from '../public/examples/AsLink';
import { Empty } from '../public/examples/Empty';

const Index = memo(() => {
  return (
    <StrictMode>
      <h1>Hook and Types for React Headless Components</h1>

      <h2>Components</h2>

      <ExampleList directory="components" files={{ Button }} />

      <h2>Examples</h2>

      <ExampleList directory="examples" files={{ Empty, AsLink }} />
    </StrictMode>
  );
});

Index.displayName = 'Index';

export default Index;
