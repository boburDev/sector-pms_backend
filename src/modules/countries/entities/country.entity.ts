import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "countries"})
export class Countries {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 255, unique: true })
    name: string;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Regions, (region) => region.country)
    regions: Regions[];
}

@Entity({ name: 'regions'})
export class Regions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column()
    countryId: string;

    @ManyToOne(() => Countries, (country) => country.regions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: 'countryId' })
    country: Countries;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
