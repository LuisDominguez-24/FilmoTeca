import { useState } from 'react'
import '../../Styles/login.css'
import hide from '../../assets/icons/hide.png'
import show from '../../assets/icons/show.png'

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="login_container">
        <h1 className='title'>Iniciar Sesión</h1>
        <form className="login-form">
          <label className='email' htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label className='password' htmlFor="password">Contraseña:</label>
          <div className="input-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
            />
            <img
              src={showPassword ? show : hide}
              alt='visibility toggle'
              className='password-toggle-icon'
              onClick={togglePasswordVisibility}
              tabIndex={0}
            />
          </div>
          <button className='boton' type="submit">Iniciar Sesión</button>
        </form>
        <p>¿No tienes una cuenta? <a href="/register">Crea tu cuenta aquí</a></p>
      </div>
    </div>
  )
}

