import { createApp } from 'vue';
import Layout from '~/components/Layout.vue';
import router from '~/router';

// global style
import './styles/index.css';
import 'virtual:windi.css';

// element-plus

const app = createApp(Layout);

// router
app.use(router);

app.mount('#app');
