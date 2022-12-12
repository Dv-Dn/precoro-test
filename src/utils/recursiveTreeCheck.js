export function recursiveTreeChecknode(value, node) {
  if (!node.children || !node.children.length)
    return { ...node, selected: value };
  return {
    ...node,
    selected: value,
    children: node.children.map((el) => recursiveTreeChecknode(value, el)),
  };
}
