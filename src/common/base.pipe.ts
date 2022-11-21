import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export class BasePipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      //forbidNonWhitelisted: true,
      validationError: { target: false },
      validateCustomDecorators: false,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const getFieldErrors = (err: ValidationError): ValidationError[] => {
          if (err.constraints) {
            return [err];
          }

          if (err.children?.length) {
            const errors = getFieldErrors(err.children[0]);
            return [err, ...errors];
          }

          return [err];
        };

        // get all errors
        const fieldErrors = getFieldErrors(validationErrors[0]);

        // format field path
        const fieldPath = fieldErrors
          .reduce<string[]>((arr, err) => [...arr, err.property], [])
          .join('.');

        // format response
        const error = {
          field: fieldPath,
          errors: fieldErrors.pop()?.constraints,
        };

        return new BadRequestException([error]);
      },
    });
  }
}
