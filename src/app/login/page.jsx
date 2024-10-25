'use client'
import styles from '@/styles/logIn.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { auth, googleProvider, githubProvider } from '../../../backend/CodigosJS/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };
  
  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Enviar las credenciales al backend
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,  
          password: password  
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user_uid', data.user);
      } else {
        setError(data.error);  
      }
    } catch (error) {
      setError('Error inesperado al hacer login.');
      console.error('Error durante el login:', error);
    }

    setLoading(false);
  };

  
  const handleSignup = async () => {
    setLoading(true); 
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,  
          password: password,  
          name: `${firstName} ${lastName}`,  
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user_uid', data.user);
      } else {
        setError(data.error);  // Mostrar el error devuelto por el backend
      }
    } catch (error) {
      setError('Error inesperado al registrar usuario.');
      console.error('Error durante el registro:', error);
    }

    setLoading(false);  // Finalizar el proceso
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true); 
    setError(''); 

    try {
        const result = await signInWithPopup(auth, googleProvider);

        // Obtener el ID token del usuario autenticado
        const idToken = await result.user.getIdToken();

        // Enviar el ID token al backend para verificar la autenticación
        const response = await fetch('http://localhost:5001/api/login/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_token: idToken,  // Enviar el ID token al backend
            }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user_uid', data.user);
        } else {
            setError(data.error);  // Mostrar el error devuelto por el backend
        }
    } catch (error) {
        setError('Error inesperado al iniciar sesión con Google.');
    }

    setLoading(false);  // Finalizar el proceso
  };
 
  const handleLoginWithGitHub = async () => {
    setLoading(true); 
    setError(''); 

    try {
        // Iniciar sesión con GitHub en el frontend
        const result = await signInWithPopup(auth, githubProvider);

        // Obtener el ID token del usuario autenticado
        const idToken = await result.user.getIdToken();

        // Enviar el ID token al backend para verificar la autenticación
        const response = await fetch('http://localhost:5001/api/login/github', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_token: idToken,  // Enviar el ID token al backend
            }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user_uid', data.user);
        } else {
            setError(data.error);  // Mostrar el error devuelto por el backend
        }
    } catch (error) {
        setError('Error inesperado al iniciar sesión con GitHub.');
    }

    setLoading(false);  // Finalizar el proceso
  };

  const handleLogout = () => {
    localStorage.removeItem('user_uid');

    window.location.href = '/login'; 
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${isSignUp ? styles.rotate : ''}`}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <div className={styles.leftPanel}>
              <h1 className={styles.headingPrimary}>OPTIFOOD</h1>
              <h2 className={styles.headingSecondary}>Welcome Back!</h2>

              <form className={styles.form}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                  id="email" 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  className={styles.input} 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Minimum 8 characters with a number" 
                  className={styles.input} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.forgotPassword}>
                  <a href="#" className={styles.forgotPasswordLink}>FORGOT PASSWORD?</a>
                </div>

                <button type="button" onClick={handleLogin} className={styles.loginBtn}>Log in</button>
                <div className={styles.socialLoginContainer}>
                      <img
                        src="/Images/icons/google-icon.png"
                        alt="Google Login"
                        className={styles.socialIcon}
                        onClick={handleLoginWithGoogle}
                      />
                      <img
                        src="/Images/icons/github-icon.webp"
                        alt="GitHub Login"
                        className={styles.socialIcon}
                        onClick={handleLoginWithGitHub}
                      />
                    </div>
              
              </form>
            </div>

            <div className={styles.rightPanel}>
              <h2 className={styles.headingSecondary3}>NEW HERE?</h2>
              <p className={styles.create}>Create an account to keep track of your applications</p>

              <Image className={styles.logo} src="/Images/2eggs.webp" width={220} height={220} alt="Jobhill logo" />

              <button type="button" onClick={handleToggle} className={styles.signinBtn}>Sign Up</button>
            </div>
          </div>

          <div className={styles.cardBack}>
            <div className={styles.leftPanel2}>
              <h2 className={styles.headingPrimary2}>ALREADY A USER?</h2>
              <p className={styles.create2}>Log back, to see your applications</p>
              <Image className={styles.logo} src="/Images/egg1.webp" width={180} height={180} alt="Jobhill logo" />

              <button type="button" onClick={handleToggle} className={styles.loginBtn2}>Log In</button>
            </div>

            <div className={styles.rightPanel2}>
              <h2 className={styles.headingSecondary2}>SIGN UP</h2>
              <form className={styles.form2}>
                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="first-name" className={styles.label2}>First Name</label>
                    <input 
                      id="first-name" 
                      name="firstName" 
                      type="text" 
                      placeholder="Ex. John" 
                      className={styles.inputSign}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className={styles.question}>
                    <label htmlFor="last-name" className={styles.label2}>Last Name</label>
                    <input 
                      id="last-name" 
                      name="lastName" 
                      type="text" 
                      placeholder="Ex. Pork" 
                      className={styles.inputSign}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)} 
                    />
                  </div>
                </div>

                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="email-signup" className={styles.label2}>Email</label>
                    <input 
                      id="email-signup" 
                      name="email" 
                      type="email" 
                      placeholder="Ex. muppets@show.com" 
                      className={styles.inputSign}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>

                  <div className={styles.question}>
                    <label htmlFor="username" className={styles.label2}>Username</label>
                    <input 
                      id="username" 
                      name="username" 
                      type="text" 
                      placeholder="Ex. KerminThePhrog" 
                      className={styles.inputSign}
                    />
                  </div>
                </div>

                <div className={styles.twoColumn}>
                  <div className={styles.question}>
                    <label htmlFor="password-signup" className={styles.label2}>Password</label>
                    <input 
                      id="password-signup" 
                      name="password" 
                      type="password" 
                      placeholder="8 characters with a number" 
                      className={styles.inputSign}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                  <div className={styles.question}>
                    <label htmlFor="confirm-password" className={styles.label2}>Confirm Password</label>
                    <input 
                      id="confirm-password" 
                      name="confirmPassword" 
                      type="password" 
                      placeholder="********" 
                      className={styles.inputSign}
                    />
                  </div>
                </div> 

                <button type="button" onClick={handleSignup} className={styles.loginBtn3}>Create Account</button>

                <div className={styles.socialLoginContainer}>
                    <img
                      src="/Images/icons/google-icon.png"
                      alt="Google Login"
                      className={styles.socialIcon}
                      onClick={handleLoginWithGoogle}
                    />
                    <img
                      src="/Images/icons/github-icon.webp"
                      alt="GitHub Login"
                      className={styles.socialIcon}
                      onClick={handleLoginWithGitHub}
                    />
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
