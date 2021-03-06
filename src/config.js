import $ from 'jquery'

import { setLogDebug } from 'ovirt-ui-components'

const CONFIG_URL = '/ovirt-engine/web-ui/userportal.config'

const AppConfiguration = {
  debug: true,
  applicationContext: '',
  applicationURL: '',
}

export function readConfiguration () {
  $.ajax({
    url: CONFIG_URL,
    success: (result) => {
      Object.assign(AppConfiguration, JSON.parse(result))
    },
    error: (result) => {
      console.log(`Failed to load production configuration, assuming development mode.`)
    },
    complete: () => {
      setLogDebug(AppConfiguration.debug)
    },
    async: false,
  })
}

export default AppConfiguration
