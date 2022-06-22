import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'epochTime', async: false})
export class IsEpochTime implements ValidatorConstraintInterface {
    validate(epochTime: number, validationArguments?: ValidationArguments): boolean {
        return epochTime < Date.now();
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'time before current time';
    }
}