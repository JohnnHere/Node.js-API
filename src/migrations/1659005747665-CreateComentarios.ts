import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComentarios1659005747665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comentarios",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "video_id",
            type: "uuid",
          },
          {
            name: "usuario_id",
            type: "uuid",
          },
          {
            name: "numero_likes",
            type: "int",
            isNullable: true,
            default: 0,
          },
          {
            name: "numero_dislikes",
            type: "int",
            isNullable: true,
            default: 0,
          },
          {
            name: "conteudo",
            type: "varchar",
            length: "350",
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
            columnNames: ["video_id"],
            referencedTableName: "videos",
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
    await queryRunner.dropTable("comentarios");
  }
}
