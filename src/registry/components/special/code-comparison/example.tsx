import { CodeComparison } from "./component";

const beforeCode = `const greeting = "hello";
console.log(greeting);`;

const afterCode = `const greeting = "hello, world!";
console.log(greeting);`;

export default function CodeComparisonExample() {
  return (
    <CodeComparison
      beforeCode={beforeCode}
      afterCode={afterCode}
      language="typescript"
      filename="example.ts"
      lightTheme="github-light"
      darkTheme="github-dark"
    />
  );
}
