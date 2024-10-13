import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
  @ApiProperty({
    example: "Bukhara",
    description: "District name",
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: "Region ID to which the district belongs",
    required: true,
  })
  @IsNumber()
  regionId: number;
}
