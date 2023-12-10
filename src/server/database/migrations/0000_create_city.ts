import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.city, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 255).index().notNullable();
    }).then(() => {
      console.log(`# Table ${ETableNames.city} created.`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.city).then(() => {
      console.log(`# Table ${ETableNames.city} dropped.`);
    });
}
