export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const isAdmin = () => {
  const role = localStorage.getItem('role');
  return role === 'admin';
};
