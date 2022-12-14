import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSearch, faMoon , faSpinner, faArrowLeft, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons'

import './assets/main.css'

const app = createApp(App)

app.use(router)

library.add(faSearch, faMoon, faMoonRegular, faSpinner, faArrowLeft, faCaretDown)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
