export var serviceReturn = (data: any, statusCode?: number) => ({
  statusCode: statusCode || 200,
  data,
});
