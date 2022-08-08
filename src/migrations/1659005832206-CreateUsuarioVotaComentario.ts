import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarioVotaComentario1659005832206
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuario_vota_comentarios",
        columns: [
          {
            name: "voto",
            type: "boolean",
          },
          {
            name: "comentario_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "usuario_id",
            type: "uuid",
            isPrimary: true,
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
        foreignKeys: [
          {
            columnNames: ["comentario_id"],
            referencedTableName: "comentarios",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["usuario_id"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuario_vota_comentarios");
  }
}
