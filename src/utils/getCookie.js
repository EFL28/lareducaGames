export const getCookie = (name) => {

  const cookieValue = document.cookie

    .split('; ')

    .find((cookie) => cookie.startsWith(`${name}=`));

  if (cookieValue) {

    return cookieValue.split('=')[1];

  }
  return null;
};