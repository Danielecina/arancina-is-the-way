import {appEventHandler} from '..'

describe('content page', () => {
  describe('appEventHandler', () => {
    test('expect to trigger correct type TOGGLE_WATCH_MODE with true value', () => {
      const message = {
        type: 'TOGGLE_WATCH_MODE',
        payload: {watchMode: true}
      }
      const sender = {}
      const response = jest.fn()

      appEventHandler(message, sender, response)
      expect(response).toHaveBeenCalledTimes(1)
      expect(response).toHaveBeenCalledWith({message: 'watch mode starting'})
    })

    test('expect to trigger correct type TOGGLE_WATCH_MODE with false value', () => {
      const message = {
        type: 'TOGGLE_WATCH_MODE',
        payload: {watchMode: false}
      }
      const sender = {}
      const response = jest.fn()

      appEventHandler(message, sender, response)
      expect(response).toHaveBeenCalledTimes(1)
      expect(response).toHaveBeenCalledWith({message: 'watch mode disabled'})
    })

    test('expect to trigger correct error message for TOGGLE_WATCH_MODE type', () => {
      const message = {
        type: 'TOGGLE_WATCH_MODE',
        payload: {watchMode: true}
      }
      const sender = {}
      const response = jest.fn()
        .mockImplementationOnce(() => {
          throw new Error('force error')
        })
        .mockImplementationOnce(jest.fn)

      appEventHandler(message, sender, response)
      expect(response.mock.calls[1][0]).toEqual(
        {message: 'watch mode failed Error: force error'}
      )
    })

    test('expect to trigger correct error message for SUBSTITUTE_WORDS type', () => {
      const message = {type: 'SUBSTITUTE_WORDS'}
      const sender = {}
      const response = jest.fn()
        .mockImplementationOnce(() => {
          throw new Error('force error')
        })
        .mockImplementationOnce(jest.fn)

      appEventHandler(message, sender, response)
      expect(response.mock.calls[1][0]).toEqual(
        {message: 'fix words failed Error: force error'}
      )
    })

    test('expect to trigger correct type SUBSTITUTE_WORDS', () => {
      const message = {type: 'SUBSTITUTE_WORDS'}
      const sender = {}
      const response = jest.fn()

      appEventHandler(message, sender, response)
      expect(response).toHaveBeenCalledTimes(1)
      expect(response).toHaveBeenCalledWith({message: 'fix words completed'})
    })

    test('expect to trigger correct response for UNKNOWN type', () => {
      const message = {type: 'UNKNOWN'}
      const sender = {}
      const response = jest.fn()

      appEventHandler(message, sender, response)
      expect(response).toHaveBeenCalledTimes(1)
      expect(response).toHaveBeenCalledWith({message: 'missing type: UNKNOWN'})
    })
  })
})
