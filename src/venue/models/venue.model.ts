import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { District } from "../../district/models/district.model";
import { Event } from "../../event/models/event.model";
import { Region } from "../../region/models/region.model";
import { Seat } from "../../seat/models/seat.model";
import { VenuePhoto } from "../../venue_photo/models/venue_photo.model";
import { VenueType } from "../../venue_type/models/venue_type.model";
import { VenueVenueType } from "../../venue_venue_type/models/venue_venue_type.model";

interface VenueCreationAttr {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  schema: string[];
  regionId: number;
  districtId: number;
}

@Table({ tableName: "venue", timestamps: false })
export class Venue extends Model<Venue, VenueCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  site: string;

  @Column({
    type: DataType.STRING(15),
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  schema: string[];

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  districtId: number;

  @HasMany(() => VenuePhoto) // venue_photo jadvaliga ko'p munosabatda bog'lash
  venue_photos: VenuePhoto[];

  @BelongsTo(() => Region) // region jadvaliga tegishli bog'lash
  region: Region;

  @BelongsTo(() => District) // district jadvaliga tegishli bog'lash
  district: District;

  @HasMany(() => Seat) // seat jadvaliga ko'p munosabatda bog'lash
  seat: Seat[];

  @BelongsToMany(() => VenueType, () => VenueVenueType)
  venue_types: VenueType[];

  @HasMany(() => Event)
  events: Event[];
}
