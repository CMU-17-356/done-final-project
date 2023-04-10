import React, { useState, useEffect } from 'react'
import { signin, signup, userFind, checkLogin } from '../api/Login';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import ErrorMessage from '../components/core/Error';
// import app from '../api/Firebase';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // Hold error text.
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // const redirectAction = () => history.replace(location.state?.from || '/user');

  useEffect(() => {
    // // If user logged in through Google, signup or login through provided info.
    // app.auth().onAuthStateChanged((account: { uid: any; displayName: string; } | null) => {
    //   if (account !== null) {
    //     // If the user is found, log in; otherwise, register.
    //     userFind(account.uid).then((data: any) => {
    //       signin(account.uid, 'externalloginpassword').then((res: any) => {
    //         history.push('/');
    //       }).catch((err: { message: React.SetStateAction<string>; }) => {
    //         setError(err.message);
    //       });
    //     }).catch((err: any) => {
    //       // Register using hard-coded password and account details.
    //       let name = account.displayName.split(' ');
    //       if (name.length == 2) {
    //         signup(account.uid, 'externalloginpassword', name[0], name[1], 'Pennsylvania').then((res: any) => {
    //           history.push('/');
    //         }).catch((err: { message: React.SetStateAction<string>; }) => {
    //           setError(err.message);
    //         });
    //       } else {
    //         signup(account.uid, 'externalloginpassword', account.displayName, '', 'Pennsylvania').then((res: any) => {
    //           history.push('/');
    //         }).catch((err: { message: React.SetStateAction<string>; }) => {
    //           setError(err.message);
    //         });
    //       }
    //     });
    //   }
    // });

    // checkLogin().then((res: string) => {
    //   if (res !== "") {
    //     navigate('/')
    //   }
    // }).catch((err: { message: React.SetStateAction<string>; }) => {
    //   setError(err.message);
    // });
  },[])

  return (
    <>
      <div id="loginbody">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h1 style={{ color: 'blue' }}> DONE</h1>
                  <form onSubmit={e => {
                    e.preventDefault()
                    // signin(username, password)
                    //   .then((res: any) => {
                    //     navigate('/')
                    //   }).catch((err: { message: React.SetStateAction<string>; }) => {
                    //     setError(err.message);
                    //   });
                    navigate('/todo')
                    console.log(username)
                    console.log(password)
                    setUsername('')
                    setPassword('')
                  }}
                  >
                    <div className="form-group mt-3">
                      <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} type="text" id="username" name="username" placeholder="Username" required />
                    </div>
                    <div className="form-group mt-3">
                      <input className="form-control" value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    <div className="form-group form-row  mt-3">
                      <button type="submit" className="btn btn-primary">Log In</button>
                      {/* <GoogleLogin successAction={redirectAction} errorAction={setError} />
                      <FacebookLogin successAction={redirectAction} errorAction={setError} /> */}
                      <p className="signup-margin text-secondary">
                        <br></br>
                        <Link to="/signup">Sign Up Here</Link>
                      </p>
                      { error ? <ErrorMessage message={error} /> : null }
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login