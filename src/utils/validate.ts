export var urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;

export var emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export var nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

var regExValidate = (regex: RegExp) => (str: string) => regex.test(str);

var url = regExValidate(urlRegex);
var email = regExValidate(emailRegex);
var name = regExValidate(nameRegex);

export var validate = {
  url,
  email,
  name,
};
