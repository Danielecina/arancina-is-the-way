import {sendMessage} from '../../lib/chromeUtils'
import {TOGGLE_WATCH_MODE} from '../../store/actions/substitution'

export default async function watchModeMessage (store) {
  if (!store?.substitution?.watchMode) return

  await sendMessage({
    type: TOGGLE_WATCH_MODE,
    payload: {watchMode: store?.substitution?.watchMode}
  })
}
