export function generatorComponent<Props extends {}>(
  generatorFn: (
    props: Props
  ) => AsyncGenerator<React.ReactNode, React.ReactNode>
): (props: Props) => Promise<React.ReactNode[]> {
  return async function (props: Props) {
    const result: React.ReactNode[] = [];
    const generator = generatorFn(props);

    try {
      for await (const node of generator) {
        result.push(node);
      }
    } catch (error) {
      console.error("Generator failed:", error);
      throw error;
    }

    return result;
  };
}
