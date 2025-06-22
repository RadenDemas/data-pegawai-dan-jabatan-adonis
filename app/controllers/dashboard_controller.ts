import type { HttpContext } from '@adonisjs/core/http'
import Jabatan from '#models/jabatan'
import Pegawai from '#models/pegawai'
import Unitkerja from '#models/unitkerja'
import Absensi from '#models/absensi'
import { DateTime } from 'luxon'

export default class DashboardController {
  async index({ view }: HttpContext) {
    const totalJabatan = (await Jabatan.query().count('* as total').first())?.$extras.total || 0
    const totalPegawai = (await Pegawai.query().count('* as total').first())?.$extras.total || 0
    const totalUnitKerja = (await Unitkerja.query().count('* as total').first())?.$extras.total || 0
    const totalHadir =
      (await Absensi.query().where('status', 'hadir').count('* as total').first())?.$extras.total ||
      0
    const totalIzin =
      (await Absensi.query().where('status', 'izin').count('* as total').first())?.$extras.total ||
      0
    const totalSakit =
      (await Absensi.query().where('status', 'sakit').count('* as total').first())?.$extras.total ||
      0
    const totalTidakHadir =
      (await Absensi.query().where('status', 'tidak_sakit').count('* as total').first())?.$extras
        .total || 0
    const totalCuti =
      (await Absensi.query().where('status', 'cuti').count('* as total').first())?.$extras.total ||
      0
    const tanggal = DateTime.now().toFormat('dd LLLL yyyy')
    return view.render('dashboard', {
      totalJabatan,
      totalPegawai,
      totalUnitKerja,
      totalHadir,
      totalIzin,
      totalSakit,
      totalTidakHadir,
      totalCuti,
      tanggal,
    })
  }
}
