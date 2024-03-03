var minLength = (v: number) => `Must be at least ${v} characters`;
var maxLength = (v: number) => `Should be maximum ${v} characters`;
var invalidUrl = () => 'this is not valid url';
var invalidEmail = () => 'this is not valid email';
var existsEmail = (v: string) => `user with ${v} email already exists`;
var invalidName = () => 'You can only use Latin and Russian letters, hyphens and spaces';
var internalServerError = () => 'Internal server error';
var notFound = (v: string) => `${v} not found`;
var findOneAndDeleteError = (v: string) => `${v} deletion error`;
var findOneAndUpdateError = (v: string) => `Can't update ${v}`;
var custom = (v: string) => v;
var validationSchemaPathRequied = (model: string, path: string) =>
  `${
    model[0].toUpperCase() + model.slice(1)
  } validation failed: ${path}: Path \`${path}\` is required.`;
var validationFailed = (model: string, path: string, message: string) =>
  `${model[0].toUpperCase() + model.slice(1)} validation failed: ${path}: ${message}`;
var invalidEmailOrPwd = () => 'Incorrect email or password';
var fieldRequired = (v: string) => `The ${v} field is required`;
var unauthorized = () => 'You should be authorized';
var forbiddenCardDelete = () => 'You cannot delete a card that is not yours';

export var message = {
  minLength,
  maxLength,
  invalidUrl,
  invalidName,
  invalidEmail,
  invalidEmailOrPwd,
  existsEmail,
  internalServerError,
  notFound,
  findOneAndDeleteError,
  findOneAndUpdateError,
  custom,
  validationSchemaPathRequied,
  validationFailed,
  fieldRequired,
  unauthorized,
  forbiddenCardDelete,
};
