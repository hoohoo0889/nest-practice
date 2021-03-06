import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BaordStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  private isStatisValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }

  transform(value: any) {
    if (value === undefined) {
      return;
    }
    value = value.toUpperCase();

    if (!this.isStatisValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }
}
