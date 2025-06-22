import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Cuti from '#models/cuti'
import Pegawai from '#models/pegawai'

export default class CutisController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page', 1)

    const cutis = await Cuti.query()
      .preload('pegawai')
      .if(search, (query) => {
        query.whereHas('pegawai', (q) => q.whereILike('nama', `%${search}%`))
      })
      .orderBy('id', 'desc')
      .paginate(page, 10)

    cutis.baseUrl('/cuti')

    return view.render('cuti/index', { cutis, search })
  }

  async create({ view }: HttpContext) {
    const pegawais = await Pegawai.query().orderBy('nama', 'asc')
    return view.render('cuti/create', { pegawais })
  }

  public async store({ request, response, session }: HttpContext) {
    const data = request.only(['pegawai_id', 'tanggal_mulai', 'tanggal_akhir', 'alasan'])

    const tanggalMulai = DateTime.fromISO(data.tanggal_mulai)
    const tanggalAkhir = DateTime.fromISO(data.tanggal_akhir)

    const jumlahHari = tanggalAkhir.diff(tanggalMulai, 'days').toObject().days! + 1

    await Cuti.create({
      pegawaiId: data.pegawai_id,
      tanggalMulai,
      tanggalAkhir,
      alasan: data.alasan,
      jumlahHari,
    })

    session.flash('success', 'Cuti berhasil diajukan')
    return response.redirect().toRoute('cuti.index')
  }

  async edit({ params, view }: HttpContext) {
    const cuti = await Cuti.findOrFail(params.id)
    const pegawais = await Pegawai.query().orderBy('nama', 'asc')
    return view.render('cuti/edit', { cuti, pegawais })
  }

  async update({ params, request, response, session }: HttpContext) {
    const cuti = await Cuti.findOrFail(params.id)
    const data = request.only([
      'pegawai_id',
      'tanggal_mulai',
      'tanggal_akhir',
      'jumlah_hari',
      'alasan',
    ])

    cuti.merge(data)
    await cuti.save()

    session.flash('success', 'Cuti berhasil diperbarui')
    return response.redirect().toRoute('cuti.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const cuti = await Cuti.findOrFail(params.id)
    await cuti.delete()

    session.flash('success', 'Cuti berhasil dihapus')
    return response.redirect().toRoute('cuti.index')
  }
}
