import Pegawai from '#models/pegawai'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Pegawai.createMany([
      {
        nip: '10001',
        nama: 'Ahmad Saputra',
        jabatanId: 1,
        unitKerjaId: 1,
        gaji: 7000000,
      },
      {
        nip: '10002',
        nama: 'Siti Rahmawati',
        jabatanId: 2,
        unitKerjaId: 2,
        gaji: 5000000,
      },
      {
        nip: '10003',
        nama: 'Budi Santoso',
        jabatanId: 3,
        unitKerjaId: 3,
        gaji: 4000000,
      },
    ])
  }
}
