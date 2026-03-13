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

const leafRegistry: Record<string, LeafHandler> = {
  subtitle: leafWithClass("md_subtitle"),
};

const registry: Record<string, DirectiveDefinition> = {
  screenplay: {
    container: (node, data) => {
      data.hName = "div";
      data.hProperties = h("div", {
        class: "md_screenplay",
        ...node.attributes,
      }).properties;
    },
    leaves: {
      heading: leafWithClass("md_screenplay_heading"),
      paren: leafWithClass("md_screenplay_paren"),
      transition: leafWithClass("md_screenplay_transition"),
      action: leafWithClass("md_screenplay_action"),
      character: leafWithClass("md_screenplay_character"),
      dialogue: leafWithClass("md_screenplay_dialogue"),
    },
  },
  "code-snippet": {
    container: (node, data) => {
      data.hName = "div";
      data.hProperties = h("div", {
        class: "md_code-snippet",
        ...node.attributes,
      }).properties;
    },
    leaves: {
      title: leafWithClass("md_code-snippet_title"),
      lang: leafWithClass("md_code-snippet_lang"),
    },
  },
  "inline-list": {
    container: (node, data) => {
      data.hName = "div";
      data.hProperties = h("div", {
        class: "md_inline-list",
        ...node.attributes,
      }).properties;
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
        if (leafRegistry[node.name]) {
          const data = node.data || (node.data = {});
          leafRegistry[node.name](node, data);
          return;
        }

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
