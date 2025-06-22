import type { HttpContext } from '@adonisjs/core/http'
import Unitkerja from '#models/unitkerja'

export default class UnitKerjaController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page', 1)

    const units = await Unitkerja.query()
      .if(search, (query) => query.whereILike('nama_unit', `%${search}%`))
      .orderBy('id', 'desc')
      .paginate(page, 10)

    return view.render('Unit_kerja/index', { units, search })
  }

  async create({ view }: HttpContext) {
    return view.render('unit_kerja/create')
  }

  async store({ request, response, session }: HttpContext) {
    await Unitkerja.create(request.only(['nama_unit', 'lokasi']))
    session.flash('success', 'Unit Kerja berhasil ditambahkan')
    return response.redirect().toRoute('unitkerja.index')
  }

  async edit({ params, view }: HttpContext) {
    const unitKerja = await Unitkerja.findOrFail(params.id)
    return view.render('unit_kerja/edit', { unitKerja })
  }

  async update({ params, request, response, session }: HttpContext) {
    const unitKerja = await Unitkerja.findOrFail(params.id)
    unitKerja.merge(request.only(['nama_unit', 'lokasi']))
    await unitKerja.save()
    session.flash('success', 'Unit Kerja berhasil diperbarui')
    return response.redirect().toRoute('unitKerja.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const unitKerja = await Unitkerja.findOrFail(params.id)
    await unitKerja.delete()
    session.flash('success', 'Unit Kerja berhasil dihapus')
    return response.redirect().toRoute('unitkerja.index')
  }
}
