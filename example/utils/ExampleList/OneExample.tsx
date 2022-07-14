import { ComponentType, memo, useEffect, useState } from 'react';

export interface OneExampleProps {
  directory: string;
  file: string;
  component: ComponentType;
}

export const OneExample = memo<OneExampleProps>(
  ({ directory, file, component: Component }) => {
    const name = Component.displayName ?? '';

    const [code, setCode] = useState('');

    useEffect(() => {
      fetch([directory, file].join('/') + '.tsx')
        .then((response) => response.text())
        .then((text) => setCode(text))
        .catch((error) => {
          setCode('/*\nError\n\n' + String(error) + '\n*/');
        });
    }, [directory, file]);

    return (
      <>
        <h3>{name}</h3>

        <h4>Render</h4>

        <Component />

        <h4>Code</h4>

        <pre>{code}</pre>
      </>
    );
  }
);

OneExample.displayName = 'OneExample';
