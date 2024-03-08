var minLength = (field: string, limit: number) =>
  `The '${field}' field should be at least ${limit} characters`;
var maxLength = (field: string, limit: number) =>
  `The '${field}' filed should be maximum ${limit} characters`;
var invalidUrl = (field: string) => `The '${field}' field is not valid url`;
var invalidEmail = (field: string) => `Invalid email in the '${field}' field`;
var existsEmail = (v: string) => `user with ${v} email already exists`;
var invalidInput = (field: string) =>
  `The '${field}' field must constist only of Latin and Russian charecters, hyphens and spaces`;
var notAllowedField = (field: string) => `The '${field}' field is not allowed`;
var internalServerError = () => 'Internal server error';
var notFound = (v: string) => `${v} not found`;
var findOneAndDeleteError = (v: string) => `${v} deletion error`;
var findOneAndUpdateError = (v: string) => `Can't update ${v}`;
var custom = (v: string) => v;
var requiedField = (field: string) => `'${field}' is required`;
var somethingWrongWithReqBody = () => 'Something wrong with request body';
var wrongParamId = (param: string) => `Incorrect '${param}' id in request params`;
var invalidEmailOrPwd = () => 'Incorrect email or password';
var unauthorized = () => 'You should be authorized';
var forbiddenCardDelete = () => 'You cannot delete a card that is not yours';

export var message = {
  minLength,
  maxLength,
  invalidUrl,
  invalidInput,
  invalidEmail,
  invalidEmailOrPwd,
  notAllowedField,
  existsEmail,
  internalServerError,
  notFound,
  findOneAndDeleteError,
  findOneAndUpdateError,
  custom,
  requiedField,
  unauthorized,
  forbiddenCardDelete,
  somethingWrongWithReqBody,
  wrongParamId,
};
