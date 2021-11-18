import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Report {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public location: string;

  @Column({ nullable: true })
  public coords: string;

  @Column({ type: "timestamptz" })
  public happenAt: Date;

  @Column({ type: "timestamptz", default: new Date() })
  public reportAt: Date;

  @Column()
  public overview: string;

  @Column({ type: "text", nullable: true })
  public detail: string;

  // 事件类别
  // 提供选项
  @Column()
  public category: string;

  // people relationship
  // 提供选项
  @Column()
  public relationship: string;

  // 对方信息
  @Column({ type: "text", nullable: true })
  public theOtherInfo: string;

  // reporter info
  @Column()
  public reporterName: string;

  // 提供选项
  @Column()
  public reporterRole: string;

  @Column()
  public contact: string;

  // 信息来源
  // 提供选项
  @Column({ default: "submit" })
  public source: string;

  @Column({ default: "submit" })
  public progress: string;

  // 是否核时
  @Column()
  public checked: boolean;
}

export default Report;
