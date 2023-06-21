import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET_KEY || 'my super secret';

class AuthService {
  getUser() {
    return jwt.verify(this.getToken(), secret);
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = jwt.verify(token, secret);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    // if (decoded.exp < Date.now() / 1000) {
    if (!decoded) {
      localStorage.removeItem('token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async login(email, password) {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
    });
    const token = await loginResponse.json().token;
    localStorage.setItem('token', token);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}

export default AuthService;
