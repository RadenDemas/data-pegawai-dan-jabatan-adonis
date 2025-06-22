import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Jabatan from '#models/jabatan'
import UnitKerja from '#models/unitkerja'
import Absensi from './absensi.js'
import Cuti from './cuti.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Pegawai extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nip: string

  @column()
  declare nama: string

  @column({ columnName: 'jabatan_id' })
  declare jabatanId: number

  @column({ columnName: 'unit_kerja_id' })
  declare unitKerjaId: number

  @column()
  declare gaji: number

  @belongsTo(() => Jabatan, {
    foreignKey: 'jabatanId',
  })
  declare jabatan: BelongsTo<typeof Jabatan>

  @belongsTo(() => UnitKerja, {
    foreignKey: 'unitKerjaId',
  })
  declare unitKerja: BelongsTo<typeof UnitKerja>

  @hasMany(() => Absensi)
  public absensis!: HasMany<typeof Absensi>

  @hasMany(() => Cuti)
  public cutis!: HasMany<typeof Cuti>
}
