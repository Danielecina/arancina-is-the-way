import {uniq} from 'ramda'

import messages from '..'

describe('strings', () => {
  test('compare if each key is present in every file of translations', () => {
    const {en, it, palermitano, siculEnglish} = messages
    const palermitanoKeys = Object.keys(palermitano).sort()
    const siculEnglishKeys = Object.keys(siculEnglish).sort()
    const enKeys = Object.keys(en).sort()
    const itKeys = Object.keys(it).sort()

    const lengths = uniq([
      palermitanoKeys.length,
      siculEnglishKeys.length,
      itKeys.length,
      enKeys.length
    ])
    expect(lengths).toHaveLength(1)
    expect(lengths[0]).toEqual(11)

    const keys = uniq([
      ...palermitanoKeys,
      ...siculEnglishKeys,
      ...itKeys,
      ...enKeys
    ])
    expect(keys.length).toEqual(lengths[0])
  })
})
