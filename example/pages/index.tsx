import { memo } from 'react';
import { Examples } from '../containers/Examples';

const Index = memo(() => {
  return (
    <>
      <h1>Hook and Types for React Headless Components</h1>

      <h2>Examples</h2>

      <Examples />
    </>
  );
});

Index.displayName = 'Index';

export default Index;
