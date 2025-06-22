/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
import JabatanController from '#controllers/jabatans_controller'
import UnitkerjasController from '#controllers/unitkerjas_controller'
import PegawaisController from '#controllers/pegawais_controller'
import CutisController from '#controllers/cutis_controller'
import AbsensisController from '#controllers/absensis_controller'
import DashboardController from '#controllers/dashboard_controller'
import { middleware } from './kernel.js'

// router.on('/').render('pages/home')
router.get('/', [DashboardController, 'index']).as('dashboard')

router.get('/login', [AuthController, 'showLogin']).as('login.show')
router.post('/login', [AuthController, 'login']).as('login')

router.get('/register', [AuthController, 'showRegister']).as('register.show')
router.post('/register', [AuthController, 'register']).as('register')

router.post('/logout', [AuthController, 'logout']).as('logout')

// router.on('/dashboard').render('dashboard').as('dashboard')

router.resource('jabatan', JabatanController).as('jabatan').middleware('*', middleware.auth())
router
  .resource('unit-kerja', UnitkerjasController)
  .as('unitkerja')
  .middleware('*', middleware.auth())

router
  .resource('pegawai', PegawaisController)
  .as('pegawai')
  .middleware('*', middleware.auth())
  .except(['show'])
router.resource('cuti', CutisController).as('cuti').middleware('*', middleware.auth())
router
  .group(() => {
    router.get('/', [AbsensisController, 'index']).as('index')
    router.get('/create', [AbsensisController, 'create']).as('create')
    router.post('/', [AbsensisController, 'store']).as('store')
    router.get('/:tanggal/edit', [AbsensisController, 'edit']).as('edit')
    router.post('/:tanggal', [AbsensisController, 'update']).as('update')
    router.get('/rekap', [AbsensisController, 'rekap']).as('rekap')
  })
  .prefix('absensi')
  .as('absensi')
  .middleware(middleware.auth())

router
  .get('/pegawai/gaji', [PegawaisController, 'gaji'])
  .as('pegawai.gaji')
  .middleware(middleware.auth())

// router
//   .post('/logout', async ({ auth, response }) => {
//     await auth.use('web').logout()
//     return response.redirect('/login')
//   })
//   .as('logout')
