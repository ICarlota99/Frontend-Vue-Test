import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './mocks/mockApi'
import 'keen-slider/keen-slider.min.css'

// Create app instance
const app = createApp(App)

// Setup Pinia
const pinia = createPinia()
app.use(pinia)

// Add router
app.use(router)

// Mount the app
app.mount('#app')
