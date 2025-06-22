import Jabatan from '#models/jabatan';
export default class JabatanController {
    async index({ view }) {
        const jabatans = await Jabatan.all();
        return view.render('jabatan/index', { jabatans });
    }
    async create({ view }) {
        return view.render('jabatan/create');
    }
    async store({ request, response, session }) {
        await Jabatan.create(request.only(['nama_jabatan', 'tunjangan']));
        session.flash('success', 'Jabatan berhasil ditambahkan');
        return response.redirect().toRoute('jabatan.index');
    }
    async edit({ params, view }) {
        const jabatan = await Jabatan.findOrFail(params.id);
        return view.render('jabatan/edit', { jabatan });
    }
    async update({ params, request, response, session }) {
        const jabatan = await Jabatan.findOrFail(params.id);
        jabatan.merge(request.only(['nama_jabatan', 'tunjangan']));
        await jabatan.save();
        session.flash('success', 'Jabatan berhasil diperbarui');
        return response.redirect().toRoute('jabatan.index');
    }
    async destroy({ params, response, session }) {
        const jabatan = await Jabatan.findOrFail(params.id);
        await jabatan.delete();
        session.flash('success', 'Jabatan berhasil dihapus');
        return response.redirect().toRoute('jabatan.index');
    }
}
//# sourceMappingURL=jabatans_controller.js.map