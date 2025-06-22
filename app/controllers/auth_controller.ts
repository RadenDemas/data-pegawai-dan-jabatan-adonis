import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async login({ request, auth, response, session }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.redirect('/')
    } catch (error) {
      session.flash('error', 'Email atau password salah')
      return response.redirect().back()
    }
  }
  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }
  async register({ request, response, session }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])

    try {
      await User.create({ name, email, password })
      session.flash('success', 'Pendaftaran berhasil. Silakan login.')
      return response.redirect().toRoute('login.show')
    } catch (error) {
      session.flash('error', 'Pendaftaran gagal')
      return response.redirect().back()
    }
  }
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('login.show')
  }
}
