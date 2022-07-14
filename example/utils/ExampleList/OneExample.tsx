import { ComponentType, memo, useEffect, useState } from 'react';
import { getTextOrError } from './getTextOrError';

interface OneExampleProps {
  id: string;
  component: ComponentType;
  file?: string;
}

export const OneExample = memo<OneExampleProps>(
  ({ id, component: Component, file }) => {
    const [source, setSource] = useState<string>();

    useEffect(() => {
      if (file) {
        fetch(file)
          .then(getTextOrError)
          .then((text) => setSource(text))
          .catch((error) => setSource(['ERROR', '', String(error)].join('\n')));
      }
    }, [file]);

    return (
      <>
        <h3>{id}</h3>

        {file && (
          <>
            <pre>{file}</pre>

            <h4>Render</h4>
          </>
        )}

        <div>
          <Component />
        </div>

        {file && (
          <>
            <h4>Code</h4>

            <pre>{source}</pre>
          </>
        )}
      </>
    );
  }
);

OneExample.displayName = 'OneExample';
