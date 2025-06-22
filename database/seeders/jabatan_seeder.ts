import Jabatan from '#models/jabatan'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Jabatan.createMany([
      { nama_jabatan: 'Manager', tunjangan: 3000000 },
      { nama_jabatan: 'Supervisor', tunjangan: 2000000 },
      { nama_jabatan: 'Staff', tunjangan: 1000000 },
    ])
  }
}
