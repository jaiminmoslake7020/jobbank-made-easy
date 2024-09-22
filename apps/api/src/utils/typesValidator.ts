export const isItErrorType = (obj: any) => {
  return obj && obj['message'] && typeof obj['message'] === 'string';
};
