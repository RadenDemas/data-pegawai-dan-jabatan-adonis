import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'
import Jabatan from '#models/jabatan'
import Unitkerja from '#models/unitkerja'

export default class PegawaisController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page', 1)

    const pegawais = await Pegawai.query()
      .preload('jabatan')
      .preload('unitKerja')
      .if(search, (query) => {
        query.whereILike('nama', `%${search}%`)
      })
      .orderBy('id', 'desc')
      .paginate(page, 10)

    pegawais.baseUrl(request.url())

    return view.render('pegawai/index', { pegawais, search })
  }

  async create({ view }: HttpContext) {
    const jabatans = await Jabatan.all()
    const unitKerjas = await Unitkerja.all()
    return view.render('pegawai/create', { jabatans, unitKerjas })
  }

  async store({ request, response, session }: HttpContext) {
    const data = request.only(['nip', 'nama', 'jabatan_id', 'unit_kerja_id', 'gaji'])
    await Pegawai.create(data)

    session.flash('success', 'Pegawai berhasil ditambahkan')
    return response.redirect().toRoute('pegawai.index')
  }

  async edit({ params, view }: HttpContext) {
    const pegawai = await Pegawai.findOrFail(params.id)
    const jabatans = await Jabatan.all()
    const unitKerjas = await Unitkerja.all()
    return view.render('pegawai/edit', { pegawai, jabatans, unitKerjas })
  }

  async update({ params, request, response, session }: HttpContext) {
    const pegawai = await Pegawai.findOrFail(params.id)
    const data = request.only(['nip', 'nama', 'jabatan_id', 'unit_kerja_id', 'gaji'])

    pegawai.merge(data)
    await pegawai.save()

    session.flash('success', 'Pegawai berhasil diperbarui')
    return response.redirect().toRoute('pegawai.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const pegawai = await Pegawai.findOrFail(params.id)
    await pegawai.delete()

    session.flash('success', 'Pegawai berhasil dihapus')
    return response.redirect().toRoute('pegawai.index')
  }

  async gaji({ request, view }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page', 1)
    // const pegawais = await Pegawai.query().preload('jabatan')
    const pegawais = await Pegawai.query()
      .preload('jabatan')
      .if(search, (q) => q.whereILike('nama', `%${search}%`))
      .orderBy('id', 'desc')
      .paginate(page, 10)
    pegawais.baseUrl(request.url())

    return view.render('pegawai/gaji', { pegawais })
  }
}
