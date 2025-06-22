import router from '@adonisjs/core/services/router';
const AuthController = () => import('#controllers/auth_controller');
import JabatanController from '#controllers/jabatans_controller';
import { middleware } from './kernel.js';
router.on('/').render('pages/home');
router.get('/login', [AuthController, 'showLogin']).as('login.show');
router.post('/login', [AuthController, 'login']).as('login');
router.get('/register', [AuthController, 'showRegister']).as('register.show');
router.post('/register', [AuthController, 'register']).as('register');
router.post('/logout', [AuthController, 'logout']).as('logout');
router.on('/dashboard').render('dashboard').as('dashboard');
router.resource('jabatan', JabatanController).as('jabatan').middleware('*', middleware.auth());
//# sourceMappingURL=routes.js.map