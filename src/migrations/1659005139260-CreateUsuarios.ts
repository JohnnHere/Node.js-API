import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarios1659005139260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "320",
            isUnique: true,
          },
          {
            name: "foto_perfil",
            type: "varchar",
          },
          {
            name: "senha",
            type: "varchar",
            length: "64",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios");
  }
}
