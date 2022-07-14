import { ComponentType, memo, useEffect, useState } from 'react';
import { getTextOrError } from './getTextOrError';
import { OneExample } from './OneExample';

export interface ExampleListProps {
  directory: string;
  space: Record<string, ComponentType>;
  from: string;
  order?: Array<ExampleListProps['space'][keyof ExampleListProps['space']]>;
}

type Space = ExampleListProps['space'];

type ComponentKey = keyof Space;

type ComponentValue = Space[ComponentKey];

export const ExampleList = memo<ExampleListProps>(
  ({ directory, from, space, order }) => {
    const [componentInfoMap, setComponentFileMap] =
      useState<Map<ComponentValue, { id: string; file: undefined | string }>>();

    const [error, setError] = useState('');

    useEffect(() => {
      fetch([...directory.split('/').slice(-1), ...from.split('/')].join('/'))
        .then(getTextOrError)
        .then((text) => {
          const componentKeyList = Object.keys(space);

          const fileList = componentKeyList.map((componentKey) => {
            const result = text.match(
              new RegExp(`export.*${componentKey}.*from ['"].(.*)['"]`)
            );

            console.log(result?.[1]);

            const modulePath = result?.[1];

            return modulePath && modulePath + '.tsx';
          });

          console.log({ fileList });

          const infoMap: NonNullable<typeof componentInfoMap> = new Map();

          for (const [index, key] of componentKeyList.entries()) {
            infoMap.set(space[key], { id: key, file: fileList[index] });
          }

          setComponentFileMap(infoMap);
        })
        .catch((error) => setError(String(error)));
    }, [space, from, directory]);

    return (
      <div>
        {error && (
          <>
            <p>Error</p>

            <pre>{error}</pre>
          </>
        )}

        {componentInfoMap &&
          (order ?? Object.values(space)).map((component) => {
            const value = componentInfoMap.get(component);

            return (
              value && (
                <OneExample
                  key={value.id}
                  id={value.id}
                  component={component}
                  file={value.file}
                />
              )
            );
          })}
      </div>
    );
  }
);

ExampleList.displayName = 'ExampleList';
