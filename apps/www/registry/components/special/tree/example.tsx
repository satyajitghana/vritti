"use client";

import {
  TreeExpander,
  TreeIcon,
  TreeLabel,
  TreeNode,
  TreeNodeContent,
  TreeNodeTrigger,
  TreeProvider,
  TreeView,
} from "./component";

export default function TreeExample() {
  return (
    <div className="flex w-full max-w-sm items-center justify-center p-8">
      <TreeProvider defaultExpandedIds={["src", "components"]} className="rounded-lg border">
        <TreeView>
          <TreeNode nodeId="src" level={0}>
            <TreeNodeTrigger>
              <TreeExpander hasChildren />
              <TreeIcon hasChildren />
              <TreeLabel>src</TreeLabel>
            </TreeNodeTrigger>
            <TreeNodeContent hasChildren>
              <TreeNode nodeId="components" level={1}>
                <TreeNodeTrigger>
                  <TreeExpander hasChildren />
                  <TreeIcon hasChildren />
                  <TreeLabel>components</TreeLabel>
                </TreeNodeTrigger>
                <TreeNodeContent hasChildren>
                  <TreeNode nodeId="button.tsx" level={2}>
                    <TreeNodeTrigger>
                      <TreeExpander />
                      <TreeIcon />
                      <TreeLabel>button.tsx</TreeLabel>
                    </TreeNodeTrigger>
                  </TreeNode>
                  <TreeNode nodeId="input.tsx" level={2} isLast>
                    <TreeNodeTrigger>
                      <TreeExpander />
                      <TreeIcon />
                      <TreeLabel>input.tsx</TreeLabel>
                    </TreeNodeTrigger>
                  </TreeNode>
                </TreeNodeContent>
              </TreeNode>
              <TreeNode nodeId="app.tsx" level={1}>
                <TreeNodeTrigger>
                  <TreeExpander />
                  <TreeIcon />
                  <TreeLabel>app.tsx</TreeLabel>
                </TreeNodeTrigger>
              </TreeNode>
              <TreeNode nodeId="index.tsx" level={1} isLast>
                <TreeNodeTrigger>
                  <TreeExpander />
                  <TreeIcon />
                  <TreeLabel>index.tsx</TreeLabel>
                </TreeNodeTrigger>
              </TreeNode>
            </TreeNodeContent>
          </TreeNode>
          <TreeNode nodeId="package.json" level={0} isLast>
            <TreeNodeTrigger>
              <TreeExpander />
              <TreeIcon />
              <TreeLabel>package.json</TreeLabel>
            </TreeNodeTrigger>
          </TreeNode>
        </TreeView>
      </TreeProvider>
    </div>
  );
}
