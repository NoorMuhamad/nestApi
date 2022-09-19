import { MigrationInterface, QueryRunner } from "typeorm"

export class insertUser1660641504958 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO users 
        (id,name,email,password,is_active) 
        VALUES (1, 'admin', 'admin@gmail.com', 'pass2word', true);`)
        queryRunner.query(
          `INSERT INTO shops
            ("id",name,type,address,"usersId") 
            VALUES (1,'Noor','Electric','Lahore',1);`)
            queryRunner.query(
              `INSERT INTO shops
                ("id",name,type,address,"usersId") 
                VALUES (2,'Test','Electric','Lahore',1);`)
  }
  

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM shops WHERE id=1`);
    await queryRunner.query(`DELETE FROM shops WHERE id=2`);
    await queryRunner.query(`DELETE FROM users WHERE id=1`);
  }
}
