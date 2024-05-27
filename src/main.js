import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';
import './styles/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const app = createApp(App);

app.use(router);
app.use(createPinia());
app.component('QuillEditor', QuillEditor)

app.mount('#app');
