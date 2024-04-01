// LocalStorage Utility Functions for Auth Information

/**
 * Stores user role in localStorage.
 * @param {string} role - The user's role.
 */
export const setUserRole = (role) => {
    localStorage.setItem('role', role);
  };
  
  /**
   * Stores user email in localStorage.
   * @param {string} email - The user's email.
   */
  export const setEmail = (email) => {
    localStorage.setItem('useremail', email);
  };
  
  /**
   * Retrieves the user's email from localStorage.
   * @returns {string|null} The user's email, if it exists.
   */
  export const getEmail = () => {
    return localStorage.getItem('useremail');
  };
  
  /**
   * Retrieves the user's role from localStorage.
   * @returns {string|null} The user's role, if it exists.
   */
  export const getUserRole = () => {
    return localStorage.getItem('role');
  };
  
  /**
   * Clears the user's role from localStorage.
   */
  export const clearUserRole = () => {
    localStorage.removeItem('role');
  };
  
  /**
   * Stores authentication information in localStorage.
   * @param {Object} param0 - The authentication information.
   * @param {string} param0.token - The JWT token.
   * @param {string} param0.userId - The user's ID.
   * @param {string} param0.email - The user's email.
   * @param {string} param0.role - The user's role.
   */
  export const setAuthInfo = ({ token, userId, email, role }) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('useremail', email);
    localStorage.setItem('userRole', role);
  };
  
  /**
   * Clears all authentication information from localStorage.
   */
  export const clearAuthInfo = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('useremail');
    localStorage.removeItem('userRole');
    
  };
  
  /**
   * Retrieves all authentication information from localStorage.
   * @returns {Object} An object containing all stored authentication information.
   */
  export const getAuthInfo = () => {
    return {
      token: localStorage.getItem('authToken'),
      id: localStorage.getItem('userId'),
      email: localStorage.getItem('useremail'),
      role: localStorage.getItem('userRole'),
      
    };
  };
  