var minLength = (v: number) => `Must be at least ${v} characters`;
var maxLength = (v: number) => `Should be maximum ${v} characters`;
var invalidUrl = () => 'this is not valid url';
var invalidName = () => 'You can only use Latin and Russian letters, hyphens and spaces';
var internalServerError = () => 'Internal server error';
var notFound = (v: string) => `${v} not found`;
var findOneAndDeleteError = (v: string) => `${v} deletion error`;
var custom = (v: string) => v;

export var message = {
  minLength,
  maxLength,
  invalidUrl,
  invalidName,
  internalServerError,
  notFound,
  findOneAndDeleteError,
  custom,
};
