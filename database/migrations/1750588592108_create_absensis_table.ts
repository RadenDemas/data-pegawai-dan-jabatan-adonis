import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'absensis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('pegawai_id')
        .unsigned()
        .references('id')
        .inTable('pegawais')
        .onDelete('CASCADE')
        .notNullable()

      table.date('tanggal').notNullable()
      table.enum('status', ['hadir', 'izin', 'sakit', 'tidak_hadir', 'cuti']).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
