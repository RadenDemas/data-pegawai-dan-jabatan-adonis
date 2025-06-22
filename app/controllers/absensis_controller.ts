import type { HttpContext } from '@adonisjs/core/http'
import Absensi from '#models/absensi'
import Pegawai from '#models/pegawai'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class AbsensisController {
  async index({ request, view }: HttpContext) {
    const tanggal = request.input('tanggal', DateTime.now().toISODate())
    const search = request.input('search')
    const page = request.input('page', 1)

    const pegawais = await Pegawai.query()
      .preload('absensis', (q) => q.where('tanggal', tanggal))
      .if(search, (q) => q.whereILike('nama', `%${search}%`))
      .orderBy('id', 'desc')
      .paginate(page, 10)

    pegawais.baseUrl('/absensi')

    return view.render('absensi/index', { pegawais, tanggal, search })
  }

  async create({ view }: HttpContext) {
    const tanggal = DateTime.now().toISODate()

    const pegawais = await Pegawai.query()
      .preload('cutis', (q) => {
        q.where('tanggal_mulai', '<=', tanggal).andWhere('tanggal_akhir', '>=', tanggal)
      })
      .preload('absensis', (q) => {
        q.where('tanggal', tanggal)
      })

    return view.render('absensi/create', { pegawais, tanggal })
  }

  async store({ request, response, session }: HttpContext) {
    const tanggal = request.input('tanggal')
    const dataAbsensi = request.input('absensi')

    for (const absensi of dataAbsensi) {
      await Absensi.updateOrCreate(
        { pegawaiId: absensi.pegawai_id, tanggal },
        { status: absensi.status || 'tidak_hadir' }
      )
    }

    session.flash('success', 'Absensi berhasil disimpan.')
    return response.redirect().toRoute('absensi.index')
  }

  async edit({ params, view }: HttpContext) {
    const tanggal = params.tanggal
    const pegawais = await Pegawai.query()
      .preload('absensis', (q) => {
        q.where('tanggal', tanggal)
      })
      .preload('cutis', (q) => {
        q.where('tanggal_mulai', '<=', tanggal).andWhere('tanggal_akhir', '>=', tanggal)
      })

    return view.render('absensi/edit', { pegawais, tanggal })
  }

  async update({ request, response, session, params }: HttpContext) {
    const tanggal = params.tanggal
    const dataAbsensi = request.input('absensi')

    for (const absensi of dataAbsensi) {
      await Absensi.updateOrCreate(
        { pegawaiId: absensi.pegawai_id, tanggal },
        { status: absensi.status || 'tidak_hadir' }
      )
    }

    session.flash('success', 'Absensi berhasil diperbarui.')
    return response.redirect().toRoute('absensi.index', {}, { qs: { tanggal } })
  }

  async rekap({ request, view }: HttpContext) {
    const bulan = request.input('bulan') || DateTime.now().toFormat('yyyy-MM')
    const search = request.input('search')
    const page = request.input('page', 1)

    const pegawais = await Pegawai.query()
      .preload('absensis', (query) => {
        query.whereRaw(`DATE_FORMAT(tanggal, '%Y-%m') = ?`, [bulan])
      })
      .if(search, (query) => query.whereILike('nama', `%${search}%`))
      .orderBy('id', 'desc')
      .paginate(page, 10)

    const absensiRekap = await db
      .from('absensis')
      .select('pegawai_id')
      .count('* as total')
      .select(db.raw(`SUM(CASE WHEN status = 'hadir' THEN 1 ELSE 0 END) as hadir`))
      .select(db.raw(`SUM(CASE WHEN status = 'izin' THEN 1 ELSE 0 END) as izin`))
      .select(db.raw(`SUM(CASE WHEN status = 'sakit' THEN 1 ELSE 0 END) as sakit`))
      .select(db.raw(`SUM(CASE WHEN status = 'tidak_hadir' THEN 1 ELSE 0 END) as tidak_hadir`))
      .select(db.raw(`SUM(CASE WHEN status = 'cuti' THEN 1 ELSE 0 END) as cuti`))
      .whereRaw(`DATE_FORMAT(tanggal, '%Y-%m') = ?`, [bulan])
      .groupBy('pegawai_id')

    const rekapMap = new Map<number, any>()
    absensiRekap.forEach((rekap) => {
      rekapMap.set(rekap.pegawai_id, rekap)
    })

    return view.render('absensi/rekap', {
      pegawais,
      rekapMap,
      bulan,
    })
  }
}
