import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { CustomValidationPipe } from "./pipe/validation.pipe";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function startApp() {
  try {
    const PORT = process.env.PORT || 3030;
    console.log(PORT);

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalPipes(new CustomValidationPipe());

    const config = new DocumentBuilder()
      .setTitle("MyTicketProject")
      .setDescription("MyTicket Project REST API")
      .setVersion("1.0")
      .addTag("NestJs, Validation, swagger, guard, sequalize, pg")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
