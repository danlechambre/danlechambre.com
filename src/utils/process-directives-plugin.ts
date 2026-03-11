import { h } from "hastscript";
import { visit } from "unist-util-visit";

type LeafHandler = (node: any, data: any) => void;
type ContainerHandler = (node: any, data: any) => void;

interface DirectiveDefinition {
  container: ContainerHandler;
  leaves?: Record<string, LeafHandler>;
}

function leafWithClass(className: string): LeafHandler {
  return (node, data) => {
    data.hName = "p";
    data.hProperties = h("p", {
      class: className,
      ...node.attributes,
    }).properties;
  };
}

const registry: Record<string, DirectiveDefinition> = {
  screenplay: {
    container: (node, data) => {
      data.hName = "div";
      data.hProperties = h("div", {
        class: "screenplay",
        ...node.attributes,
      }).properties;
    },
    leaves: {
      heading: leafWithClass("heading"),
      paren: leafWithClass("paren"),
      transition: leafWithClass("transition"),
      action: leafWithClass("action"),
      character: leafWithClass("character"),
      dialogue: leafWithClass("dialogue"),
    },
  },
  "code-snippet": {
    container: (node, data) => {
      data.hName = "div";
      data.hProperties = h("div", {
        class: "code-snippet",
        ...node.attributes,
      }).properties;
    },
    leaves: {
      title: leafWithClass("snippet-title"),
      lang: leafWithClass("snippet-lang"),
    },
  },
};

export function processDirectivesPlugin() {
  return (tree: any) => {
    visit(tree, (node: any, _index: any, parent: any) => {
      if (node.type === "containerDirective") {
        const def = registry[node.name];
        if (!def) return;

        const data = node.data || (node.data = {});
        def.container(node, data);
        return;
      }

      if (node.type === "leafDirective") {
        if (
          parent?.type === "containerDirective" &&
          registry[parent.name]?.leaves?.[node.name]
        ) {
          const data = node.data || (node.data = {});
          registry[parent.name].leaves?.[node.name](node, data);
        }
        return;
      }
    });
  };
}
