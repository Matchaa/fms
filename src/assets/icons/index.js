import Vue from 'vue'
import svgIcon from 'components/svgIcon'

// register globally
Vue.component('svg-icon', svgIcon)

const req = require.context('./', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
