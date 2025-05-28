import { ReactNode } from "react";

export function generatorComponent<Props extends {}>(
  generatorFn: (props: Props) => AsyncGenerator<ReactNode, ReactNode>
): (props: Props) => AsyncGenerator<ReactNode, ReactNode> {
  return function Component(props: Props) {
    return generatorFn(props);
  };
}
