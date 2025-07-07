import { useState } from 'react'
import '../../Styles/Register.css'
import hide from '../../assets/icons/hide.png'
import show from '../../assets/icons/show.png'

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
  };

  return (
    <div className="container">
      <div className="login_container">
        <h1 className='title'>Crear Cuenta</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className='email' htmlFor="email">Nombre de Usuario:</label>
          <input type="text" id="username" name="username" required />
          <label className='email' htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label className='password' htmlFor="password">Contraseña(mínimo 8 caracteres):</label>
          <div className="input-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              className={passwordError ? 'input-error' : ''}
            />
            <img
              src={showPassword ? show : hide}
              alt='visibility toggle'
              className='password-toggle-icon'
              onClick={togglePasswordVisibility}
              tabIndex={0}
            />
          </div>
          <label className='password' htmlFor="password">Confirmar Contraseña:</label>
          <div className="input-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              required
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                setPasswordError('');
              }}
              className={passwordError ? 'input-error' : ''}
            />
            <img
              src={showPassword ? show : hide}
              alt='visibility toggle'
              className='password-toggle-icon'
              onClick={togglePasswordVisibility}
              tabIndex={0}
            />
          </div>
          {passwordError && <span className="error-message">{passwordError}</span>}
          <button className='boton' type="submit">Crear Cuenta</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  )
}

