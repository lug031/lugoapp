import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import './assets/tailwind.css'
Amplify.configure(outputs)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
