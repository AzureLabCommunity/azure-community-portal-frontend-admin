'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { msalConfig, loginRequest } from './authConfig';
import './style.css';

const msalInstance = new PublicClientApplication(msalConfig);

const Login = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <LoginForm />
    </MsalProvider>
  );
};

const LoginForm: React.FC = () => {
  const { instance } = useMsal();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await instance.loginPopup(loginRequest);
      if (response.account) {
        window.location.href = '/admin';
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <ul className="flex border-b mb-4">
          <li className="mr-1">
            <a className="inline-block py-2 px-4" href="#">LOG IN</a>
          </li>
          <li className="mr-1">
            <a className="inline-block py-2 px-4 text-gray-400" href="#">SIGN UP</a>
          </li>
        </ul>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm mb-2 text-black font-semibold">USERNAME</label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
                   </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2 text-black font-semibold">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="hidden"
                checked={rememberMe}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="rememberMe"
                className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${
                  rememberMe ? 'bg-black' : 'bg-gray-300'
                } rounded-full`}
              >
                <span
                  className={`block w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in ${
                    rememberMe ? 'translate-x-4' : ''
                  }`}
                ></span>
              </label>
              <label htmlFor="rememberMe" className="text-black text-sm">KEEP ME SIGNED IN</label>
            </div>
            <div>
              <a href="#" className="text-black text-sm">Forgot your password?</a>
            </div>
          </div>
          <button type="submit" className="bg-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">SIGN IN</button>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
