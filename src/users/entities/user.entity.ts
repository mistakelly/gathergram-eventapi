import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Role {
  ADMIN = 'admin',
  GUEST = 'guest',
  BRIDE = 'bride',
  GROOM = 'groom',
  BEST_MAN = 'best-man',
  MAID_OF_HONOR = 'maid-of-honor',
}

@Entity()
@ObjectType()
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Field()
  @Column({ unique: true })
  username: string;

  @IsEmail()
  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  @IsString()
  password: string;

  @Field()
  @Column({ type: 'enum', enum: Role, default: Role.GUEST })
  role: Role;

  @CreateDateColumn({ type: 'timestamp' })
  dateJoined: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  dateUpdated: Date;

  @IsString()
  @Field({ nullable: true })
  @Column({ nullable: true })
  refreshToken?: string;

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  getRole(): Role {
    return this.role;
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
