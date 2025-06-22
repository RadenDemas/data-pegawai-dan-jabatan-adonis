import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pegawais'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nip').unique().notNullable()
      table.string('nama').notNullable()
      table
        .integer('jabatan_id')
        .unsigned()
        .references('id')
        .inTable('jabatans')
        .onDelete('CASCADE')
      table
        .integer('unit_kerja_id')
        .unsigned()
        .references('id')
        .inTable('unitkerjas')
        .onDelete('CASCADE')
      table.decimal('gaji', 15, 2).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
