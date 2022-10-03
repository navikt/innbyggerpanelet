import {
    ValidationArguments,
    ValidationTypes,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments) {
        return propertyValue < args.object[args.constraints[0] as keyof ValidationTypes]
    }

    defaultMessage(args: ValidationArguments) {
        return 'Startdato må være før sluttdato'
    }
}
