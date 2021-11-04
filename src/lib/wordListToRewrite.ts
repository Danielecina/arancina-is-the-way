interface WrongMap {
  wrongWord: string
  correctWord: string
}

const wordListToRewrite : Array<WrongMap> = [
  {
    wrongWord: 'arancino',
    correctWord: 'arancina'
  },
  {
    wrongWord: 'arancini',
    correctWord: 'arancine'
  },
  {
    wrongWord: 'Arancino',
    correctWord: 'Arancine'
  },
  {
    wrongWord: 'Arancini',
    correctWord: 'Arancine'
  }
]

export default wordListToRewrite
