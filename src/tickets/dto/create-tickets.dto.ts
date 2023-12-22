import { IsOptional, IsString, Length } from 'class-validator';

export class CreateTicketsDto {
  @IsOptional()
  @IsString()
  @Length(2)
  content: string;

  @IsOptional()
  status: boolean;
}
