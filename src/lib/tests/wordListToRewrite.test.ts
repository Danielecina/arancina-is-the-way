import wordListToRewrite from '../wordListToRewrite'

describe('wordListToRewrite', () => {
  test('snapshot', () => {
    expect(wordListToRewrite).toMatchSnapshot()
  })
})
