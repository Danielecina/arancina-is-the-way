import nodeTypeToEvaluate from '../nodeTypeToEvaluate'

describe('nodeTypeToEvaluate', () => {
  test('expect to exclude nodeType SCRIPT & STYLE', () => {
    const testCases = [
      {nodeType: 1, nodeName: 'BODY', expected: true},
      {nodeType: 1, nodeName: 'P', expected: true},
      {nodeType: 1, nodeName: 'HR', expected: true},
      {nodeType: 1, nodeName: 'DIV', expected: true},
      {nodeType: 1, nodeName: 'SCRIPT', expected: false},
      {nodeType: 1, nodeName: 'STYLE', expected: false}
    ]
    testCases.forEach(({nodeType, nodeName, expected}) => {
      const ret = nodeTypeToEvaluate(nodeType, nodeName)
      expect(ret).toBe(expected)
    })
  })

  test('expect to include only Element type and Text type', () => {
    const testCases = [
      {nodeType: 1, nodeName: 'BODY', expected: true},
      {nodeType: 2, nodeName: 'BODY', expected: false},
      {nodeType: 3, nodeName: 'BODY', expected: true},
      {nodeType: 4, nodeName: 'BODY', expected: false},
      {nodeType: 5, nodeName: 'BODY', expected: false},
      {nodeType: 6, nodeName: 'BODY', expected: false}
    ]
    testCases.forEach(({nodeType, nodeName, expected}) => {
      const ret = nodeTypeToEvaluate(nodeType, nodeName)
      expect(ret).toBe(expected)
    })
  })
})
