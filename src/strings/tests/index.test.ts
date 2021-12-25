import messages from '..'

describe('strings', () => {
  test('compare strings', () => {
    const {en, it} = messages
    const enKeys = Object.keys(en)
    const itKeys = Object.keys(it)
    expect(enKeys).toStrictEqual(itKeys)
  })
})
