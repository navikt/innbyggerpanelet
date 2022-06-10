import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments) {
        return propertyValue < args.object[args.constraints[0]];
    }

    defaultMessage(args: ValidationArguments) {
        return 'Startdato må være før sluttdato';
    }
}
