import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Pegawai from '#models/pegawai'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cuti extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawaiId: number

  @column.date()
  declare tanggalMulai: DateTime

  @column.date()
  declare tanggalAkhir: DateTime

  @column()
  declare jumlahHari: number

  @column()
  declare alasan: string

  @belongsTo(() => Pegawai)
  declare pegawai: BelongsTo<typeof Pegawai>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
