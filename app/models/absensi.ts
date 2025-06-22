import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Pegawai from '#models/pegawai'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Absensi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'pegawai_id' })
  declare pegawaiId: number

  @column()
  declare tanggal: string

  @column()
  declare status: 'hadir' | 'izin' | 'sakit' | 'tidak_hadir' | 'cuti'

  @belongsTo(() => Pegawai, {
    foreignKey: 'pegawaiId',
  })
  declare pegawai: BelongsTo<typeof Pegawai>
}
