import "./register.css"

export default function Register() {
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Kabutar</h3>
                <span className="loginDesc">Connect with your friends to feel more insecure</span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Username" type="text" className="loginInput" />
                    <input placeholder="Email" type="text" className="loginInput" />
                    <input placeholder="Password" type="password" className="loginInput" />
                    <input placeholder="Password Again" type="password" className="loginInput" />
                    <button className="loginButton">Sign up</button>
                    <span className="accountAlready">Already have an Account ?</span>
                    <button className="loginRegisterButton">Login</button>
                </div>
            </div>
        </div>

    </div>
  )
}
