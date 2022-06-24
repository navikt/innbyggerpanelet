import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isValid } from 'norwegian-birth-number-validator';

@ValidatorConstraint({ name: 'birthNumber', async: false})
export class IsNorwegianBirthNumber implements ValidatorConstraintInterface {
    validate(birthNumber: string, args: ValidationArguments) {
        return isValid(birthNumber);
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Birth number not valid';
    }
}