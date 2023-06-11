import { createApp } from 'vue'
import App from './App.vue'

// Import Vue Router
import router from './router'

// Import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

// Import vue3-toastify
import Toastify from 'vue3-toastify'

const app = createApp(App)

// Use Vue Router
app.use(router)

// Use Toastify
app.use(Toastify)

app.mount('#app')
