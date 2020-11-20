import { ValidationError } from "yup";

interface ErrorProps {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): ErrorProps {
  const validationErrors: ErrorProps = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  })

  return validationErrors ;
}