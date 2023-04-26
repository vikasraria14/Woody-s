import {
	Link,
     useNavigate
} from "react-router-dom"

import image1 from './images/image-01.jpeg'
import './font-awesome-4.7.0/css/font-awesome.min.css'
import { setLogin } from "../../Controllers/login"
import {  useDispatch } from 'react-redux'
import {  useState } from "react"
import { logInUser } from "../../Reducers/loggedInUserReducer"
const Login=()=>{
	const [errorMessage,setErrorMessage]=useState('')
    const navigate = useNavigate()
    
	const [username,setUsername]=useState('default')
	const [password,setPassword]=useState('default')
    const dispatch = useDispatch();
    

    const login = async (event) => {
        event.preventDefault();
        
        const data = { username, password }
        const res = await setLogin(data);
		if(res.err)
		{
			
			setErrorMessage(res.err)
			setTimeout(()=>{
				setErrorMessage('')
			},5000)
		}
		else
		{
			window.localStorage.setItem('loggedInUser', JSON.stringify(res))
			console.log(res.user[0].userType)
			
			dispatch(logInUser(res))
			if(res.user[0].userType==='user')
			{
				navigate('/userView')
			}
			else
			{
				navigate('/adminView')
			}
			
		}
        
        
    }
    return(
        <>
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={image1} alt="IMG"/>
				</div>

				<form onSubmit={login} className="login100-form validate-form">
					<span className="login100-form-title">
					Welcome to Woody's Service Station
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" value={username} name="username" placeholder="Username" onChange={(event)=>{setUsername(event.target.value)}}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" value={password} name="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<div className="error">
						{errorMessage}
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Login
						</button>
					</div>

					

					<div className="text-center p-t-136">
						<Link to={'/signup'}  className="txt2" >
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</Link>
					</div>
				</form>
			</div>
		</div>
	</div>
    </>
    )
}
export default Login;