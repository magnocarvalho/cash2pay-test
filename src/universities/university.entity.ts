import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUniversity } from './university.interface';

@Entity('university')
export class UniversityEntity extends BaseEntity implements IUniversity {
  @PrimaryColumn({ type: 'uuid', update: false, nullable: false })
  @Generated('uuid')
  id: string;

  @CreateDateColumn({ update: false, type: 'timestamp with time zone' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  alpha_two_code: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column('varchar')
  country?: string;

  @Column('jsonb')
  web_pages?: string[];

  @Column('jsonb')
  domains?: string[];

  @Column({ name: 'state_province', nullable: true })
  'state-province'?: string;
}
