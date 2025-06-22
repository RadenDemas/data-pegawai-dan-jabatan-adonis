import Cuti from '#models/cuti'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Cuti.createMany([
      {
        pegawaiId: 1,
        tanggalMulai: DateTime.now().plus({ days: 1 }),
        tanggalAkhir: DateTime.now().plus({ days: 3 }),
        jumlahHari: 3,
        alasan: 'Mau mogok kerja',
      },
      {
        pegawaiId: 2,
        tanggalMulai: DateTime.now().minus({ days: 5 }),
        tanggalAkhir: DateTime.now().minus({ days: 2 }),
        jumlahHari: 4,
        alasan: 'Malas',
      },
    ])
  }
}
