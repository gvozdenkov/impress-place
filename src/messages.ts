var minLength = (v: number) => `Must be at least ${v} characters`;
var maxLength = (v: number) => `Should be maximum ${v} characters`;
var invalidUrl = () => 'this is not valid url';
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

export var message = {
  minLength,
  maxLength,
  invalidUrl,
  invalidName,
  internalServerError,
  notFound,
  findOneAndDeleteError,
  findOneAndUpdateError,
  custom,
  validationSchemaPathRequied,
  validationFailed,
};
