export const Login = () => {
  return (
    <div className="login-container">
      <h2>Log In</h2>

      <p>We are glad to see you again in our wine community</p>

      <form>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

        <p className="consent">
          By clicking the "Log In" button, you confirm your consent to the
          transfer of personal data
          <br />
          and confirm that you have read our privacy
          policy.
        </p>

        <button type="submit">Log In</button>
      </form>
    </div>
  )
}
