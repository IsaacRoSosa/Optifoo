'use client'
import styles from '@/styles/logIn.module.css';
import { useState } from 'react';
import { signupUser } from '../../../backend/auth';
import { loginUser } from '../../../backend/login';
import { handleAuthError } from '../../../backend/authErrors';
import Image from 'next/image';

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
      const user = await loginUser(email, password);
    } 
    catch (e) {
      setError('Error inesperado al hacer login del usuario.');
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await signupUser(email, password, { name: `${firstName} ${lastName}` });
    } 
    catch (e) {
      setError('Error inesperado al registrar el usuario.'); 
    }
  
    setLoading(false);
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

                <button type="button" onClick={handleSignUp} className={styles.loginBtn3}>Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
