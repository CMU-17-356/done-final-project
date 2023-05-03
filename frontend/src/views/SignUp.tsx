import React, {useState, useEffect} from 'react'
import { signup } from '../api/Login';
import ErrorMessage from '../components/core/Error';
import { useNavigate, Link } from 'react-router-dom'
import {addUser, authenticateUser} from '../backend-adapter'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [failed, setFailed] = useState(false)

  // Hold error text.
  const [error, setError] = useState('');

  const navigate = useNavigate()
 
  return (
    <>
      <div>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h1 style={{ color: 'blue' }}>Create an account</h1>
                  <p className="text-secondary">Get started with DONE!</p>
                  <form onSubmit={async e => {
                    e.preventDefault()
                    // signup(username, password, fname, lname)
                    //   .then((res) => {
                    //     navigate('/')
                    //   }).catch((err) => {
                    //     setError(err.message);
                    //   });
                    console.log(username, password, fname, lname);
                    const user = {
                      first_name: fname,
                      last_name: lname,
                      username: username,
                      password: password
                    }

                    let result = await addUser(user)
              
                    if(result){
                      console.log("success")
                      navigate('/')
                      setUsername('')
                      setPassword('')
                      setFName('')
                      setLName('')
                      setFailed(false)
                    } else {
                      console.log("failed")
                      setFailed(true)
                    }
                    
                  }}
                  >
                    <div className="form-group">
                      <label htmlFor="fname"> Name: </label>
                      <div className="form-row">
                        <input className="form-control" type="text" id="fname" name="fname" value={fname} onChange={e => setFName(e.target.value)} placeholder="First Name" required />
                        <input className="form-control" type="text" id="lname" name="lname" value={lname} onChange={e => setLName(e.target.value)} placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="username"> Login: </label>
                      <input className="form-control" type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="text" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="form-group mt-3">
                      <p className="signup-margin text-secondary">
                        <Link to="/"> Return to login page</Link>
                      </p>
                      { error ? <ErrorMessage message={error} /> : null }
                      <button className="btn btn-primary float-right" type="submit">Submit</button>
                    </div>
                    { failed ? "Failed to sign up!" : null }
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
export default Signup