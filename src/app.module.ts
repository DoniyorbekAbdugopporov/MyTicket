import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { HumanCategoryModule } from "./human_category/human_category.module";
import { HumanCategoryController } from "./human_category/human_category.controller";
import { HumanCategoryService } from "./human_category/human_category.service";
import { HumanCategory } from "./human_category/models/human_category.model";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { SeatTypeModule } from "./seat_type/seat_type.module";
import { VenueTypeModule } from "./venue_type/venue_type.module";
import { SeatType } from "./seat_type/models/seat_type.model";
import { VenueType } from "./venue_type/models/venue_type.model";
import { VenueModule } from "./venue/venue.module";
import { Venue } from "./venue/models/venue.model";
import { VenuePhotoModule } from "./venue_photo/venue_photo.module";
import { VenuePhoto } from "./venue_photo/models/venue_photo.model";
import { RegionModule } from "./region/region.module";
import { Region } from "./region/models/region.model";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/models/district.model";
import { SeatModule } from "./seat/seat.module";
import { Seat } from "./seat/models/seat.model";
import { LanguageModule } from "./language/language.module";
import { Language } from "./language/models/language.model";
import { TicketStatusModule } from "./ticket_status/ticket_status.module";
import { TicketStatus } from "./ticket_status/models/ticket_status.model";
import { CartStatusModule } from "./cart_status/cart_status.module";
import { CartStatus } from "./cart_status/models/cart_status.model";
import { BookingStatusModule } from "./booking_status/booking_status.module";
import { BookingStatus } from "./booking_status/models/booking_status.model";
import { VenueVenueTypeModule } from "./venue_venue_type/venue_venue_type.module";
import { VenueVenueType } from "./venue_venue_type/models/venue_venue_type.model";
import { RolesModule } from "./roles/roles.module";
import { Roles } from "./roles/models/roles.model";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/users.model";
import { UserRoles } from "./users/models/users-role.model";
import { EventTypeModule } from "./event_type/event_type.module";
import { EventModule } from "./event/event.module";
import { Event } from "./event/models/event.model";
import { TicketModule } from "./ticket/ticket.module";
import { Ticket } from "./ticket/models/ticket.model";
import { EventType } from "./event_type/models/event_type.model";
import { AuthModule } from "./auth/auth.module";
import { CustomerModule } from "./customer/customer.module";
import { CustomerAddressModule } from "./customer_address/customer_address.module";
import { Customer } from "./customer/models/customer.model";
import { CountryModule } from "./country/country.module";
import { Country } from "./country/models/country.model";
import { CustomerAddress } from "./customer_address/models/customer_address.model";
import { CustomerCardModule } from "./customer_card/customer_card.module";
import { CustomerCard } from "./customer_card/models/customer_card.model";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { CartModule } from './cart/cart.module';
import { Cart } from "./cart/models/cart.model";
import { BookingModule } from './booking/booking.module';
import { Booking } from "./booking/models/booking.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      models: [
        HumanCategory,
        SeatType,
        VenueType,
        Venue,
        VenuePhoto,
        Region,
        District,
        Seat,
        Language,
        TicketStatus,
        CartStatus,
        BookingStatus,
        VenueVenueType,
        Roles,
        Users,
        UserRoles,
        EventType,
        Event,
        Ticket,
        Customer,
        CustomerAddress,
        CustomerCard,
        Country,
        Admin,
        Cart,
        Booking,
      ], // Barcha modellarni kiritamiz
      autoLoadModels: true,
      sync: { alter: true }, // force
      // synchronize: true, // modelda yo'q bo'lgan yangi colomn qoshganizda xatolik bermaydi
      logging: false, // Consolga loglarni chiqaradi
    }),
    HumanCategoryModule,
    SeatTypeModule,
    VenueTypeModule,
    VenueModule,
    VenuePhotoModule,
    RegionModule,
    DistrictModule,
    SeatModule,
    LanguageModule,
    TicketStatusModule,
    CartStatusModule,
    BookingStatusModule,
    VenueVenueTypeModule,
    RolesModule,
    UsersModule,
    EventTypeModule,
    EventModule,
    TicketModule,
    AuthModule,
    CustomerModule,
    CustomerAddressModule,
    CustomerCardModule,
    CountryModule,
    AdminModule,
    FileModule,
    CartModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// Middlewaredan foydalanish
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes("human-category");
//   }
// }
