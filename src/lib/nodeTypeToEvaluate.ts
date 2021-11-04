export default function nodeTypeToEvaluate (nodeType: number, nodeName: string) {
  // To more info on this array of numbers see w3schools.com/jsref/prop_node_nodetype.asp
  return (
    [1, 3].includes(nodeType) &&
    !['SCRIPT', 'STYLE'].includes(nodeName)
  )
}
