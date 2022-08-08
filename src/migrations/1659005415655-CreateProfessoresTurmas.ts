import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfessoresTurmas1659005415655
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "professores_turmas",
        columns: [
          {
            name: "professor_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "turma_id",
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
            columnNames: ["professor_id"],
            referencedTableName: "professores",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["turma_id"],
            referencedTableName: "turmas",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("professores_turmas");
  }
}
