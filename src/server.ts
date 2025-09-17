import { AuthRoute } from '@/routes/auth.route';
import { App } from './app';

const app = new App([new AuthRoute()]);

app.listen();
