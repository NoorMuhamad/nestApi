import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from "typeorm"

export class userTbl1660640247114 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true
        },
        {
          name: "name",
          type: "varchar(1024)",
        },
        {
          name: "email",
          type: "varchar(1024)",
        },
        {
          name: "password",
          type: "varchar(1024)",
        },
        {
          name: "is_active",
          type: "boolean",
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()",
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()",
        },
      ]
    }), true)


    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "IDX_USERS_NAME",
        columnNames: ["name"],
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: "shops",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true,
    )

    await queryRunner.addColumn(
      "shops",
      new TableColumn({
        name: "usersId",
        type: "int",
      }),
    )

    await queryRunner.createForeignKey(
      "shops",
      new TableForeignKey({
        columnNames: ["usersId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("shops")
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("usersId") !== -1,
    )
    await queryRunner.dropForeignKey("shops", foreignKey)
    await queryRunner.dropColumn("shops", "usersId")
    await queryRunner.dropTable("shops")
    await queryRunner.dropIndex("users", "IDX_USERS_NAME")
    await queryRunner.dropTable("users")
  }
}
