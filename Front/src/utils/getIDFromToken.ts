/**
 * 
 * @returns {number} Retourne l'ID de l'utilisateur s'il est connecté.
 */

export const getIDFromToken = () => {
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    console.log('Vous devez être connecté');
    return;
  }
  if (token) {
    const decodeToken = (token: string) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const jsonObject = JSON.parse(jsonPayload);
      const id = jsonObject.data.id;
      return id;
    };
    return decodeToken(token);
  }
};
