export function generatorComponent<Props extends {}>(
  generatorFn: (
    props: Props
  ) => AsyncGenerator<React.ReactNode, React.ReactNode>
): (props: Props) => Promise<React.ReactNode[]> {
  return async function (props: Props) {
    const result: React.ReactNode[] = [];
    const generator = generatorFn(props);

    for await (const node of generator) {
      console.log(node);
      result.push(node);
    }

    return result;
  };
}
