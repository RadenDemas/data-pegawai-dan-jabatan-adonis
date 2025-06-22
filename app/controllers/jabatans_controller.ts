import type { HttpContext } from '@adonisjs/core/http'
import Jabatan from '#models/jabatan'

export default class JabatanController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page', 1)

    const jabatans = await Jabatan.query()
      .if(search, (query) => query.whereILike('nama_jabatan', `%${search}%`))
      .orderBy('id', 'desc')
      .paginate(page, 10)

    return view.render('jabatan/index', { jabatans, search })
  }

  async create({ view }: HttpContext) {
    return view.render('jabatan/create')
  }

  async store({ request, response, session }: HttpContext) {
    await Jabatan.create(request.only(['nama_jabatan', 'tunjangan']))
    session.flash('success', 'Jabatan berhasil ditambahkan')
    return response.redirect().toRoute('jabatan.index')
  }

  async edit({ params, view }: HttpContext) {
    const jabatan = await Jabatan.findOrFail(params.id)
    return view.render('jabatan/edit', { jabatan })
  }

  async update({ params, request, response, session }: HttpContext) {
    const jabatan = await Jabatan.findOrFail(params.id)
    jabatan.merge(request.only(['nama_jabatan', 'tunjangan']))
    await jabatan.save()
    session.flash('success', 'Jabatan berhasil diperbarui')
    return response.redirect().toRoute('jabatan.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const jabatan = await Jabatan.findOrFail(params.id)
    await jabatan.delete()
    session.flash('success', 'Jabatan berhasil dihapus')
    return response.redirect().toRoute('jabatan.index')
  }
}
