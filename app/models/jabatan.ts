import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Jabatan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_jabatan: string

  @column()
  declare tunjangan: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
