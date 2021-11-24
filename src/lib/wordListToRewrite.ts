interface WrongMap {
  wrongWord: string,
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
  }
]

export default wordListToRewrite
