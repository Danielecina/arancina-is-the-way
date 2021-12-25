export default function nodeTypeToEvaluate (nodeType: number, nodeName: string): boolean {
  // To more info on this nodeType array of numbers see w3schools.com/jsref/prop_node_nodetype.asp
  // To more info on this nodeName array of numbers see https://www.w3schools.com/jsref/prop_node_nodename.asp
  return (
    [1, 3].includes(nodeType) &&
    !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(nodeName)
  )
}
