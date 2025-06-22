import User from '#models/user';
export default class AuthController {
    async showLogin({ view }) {
        return view.render('auth/login');
    }
    async login({ request, auth, response, session }) {
        const email = request.input('email');
        const password = request.input('password');
        try {
            const user = await User.verifyCredentials(email, password);
            await auth.use('web').login(user);
            return response.redirect('/');
        }
        catch (error) {
            session.flash('error', 'Email atau password salah');
            return response.redirect().back();
        }
    }
    async showRegister({ view }) {
        return view.render('auth/register');
    }
    async register({ request, response, session }) {
        const { name, email, password } = request.only(['name', 'email', 'password']);
        try {
            await User.create({ name, email, password });
            session.flash('success', 'Pendaftaran berhasil. Silakan login.');
            return response.redirect().toRoute('login.show');
        }
        catch (error) {
            session.flash('error', 'Pendaftaran gagal');
            return response.redirect().back();
        }
    }
    async logout({ auth, response }) {
        await auth.use('web').logout();
        return response.redirect().toRoute('login.show');
    }
}
//# sourceMappingURL=auth_controller.js.map