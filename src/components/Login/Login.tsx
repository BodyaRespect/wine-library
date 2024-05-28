import './Login.scss'

export const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
          <h2 className="create-account">Create account</h2>
        </div>

        <button className="google-login-button">
          <img alt="Google logo" src="https://www.google.com/favicon.ico" />
          Continue with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <form className="login-form">
          <label htmlFor="email">EMAIL *</label>
          <input id="email" placeholder="Email" type="email" />

          <label htmlFor="password">PASSWORD *</label>
          <input id="password" placeholder="Password" type="password" />

          <div className="remember-me">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me on this computer</label>
          </div>

          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>

        <p className="terms">
          By continuing, I confirm that I have read and accept the
          <a href="#"> Terms and Conditions </a>
          and the
          <a href="#"> Privacy Policy </a>
          .
        </p>

        <a className="forgot-password" href="#">
          Forgotten your password?
        </a>
      </div>
    </>
  )
}

export default Login
