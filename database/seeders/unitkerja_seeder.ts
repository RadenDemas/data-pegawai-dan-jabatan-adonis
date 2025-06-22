import Unitkerja from '#models/unitkerja'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Unitkerja.createMany([
      { nama_unit: 'HRD', lokasi: 'Jakarta' },
      { nama_unit: 'IT Support', lokasi: 'Bandung' },
      { nama_unit: 'Keuangan', lokasi: 'Surabaya' },
    ])
  }
}
