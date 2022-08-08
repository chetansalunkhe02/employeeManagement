export const sendErrorResponse = (res, code, errorMessage, e = null) => {
  return res
    .status(code)
    .send({
      status: 'error',
      error: errorMessage,
      e: e?.toString(),
    });
}

export const sendSuccessResponse = (res, code, data, message = 'Successful') => {
  return res
    .status(code)
    .send({
      status: 'success',
      data,
      message,
    });
}