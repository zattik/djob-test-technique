import { IsNotEmpty } from 'class-validator';

export class CreateTicketsDiscussionsDto {
  @IsNotEmpty()
  content: string;
}
