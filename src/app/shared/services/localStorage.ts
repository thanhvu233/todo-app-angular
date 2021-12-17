export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setAccessToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};

export const removeAccessToken = () => {
  return localStorage.removeItem('accessToken');
};
