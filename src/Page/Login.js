import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import userSlice from '../store/user'
import jwtDecode from 'jwt-decode'
import { GoogleLogin } from 'react-google-login';

const Login = () => {

    const { register, handleSubmit, formState } = useForm()
    const [loginStatus, setLoginStatus] = useState({
        success: false,
        message: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formSubmitHandler = (data) => {
        const postData = {
            email: data.user_email,
            password: data.user_password
        }

        axios.post('http://localhost:4000/login', postData)
        .then((res) => {
            if (typeof res.data.accessToken !== "undefined") {
                // menyimpan di local storage
                localStorage.setItem("binarAccessToken", res.data.accessToken);

                // menyimpan di redux store
                const user = jwtDecode(res.data.accessToken);
                axios.get(`http://localhost:4000/users/${user.sub}`).then((res) => {
                    dispatch(
                        userSlice.actions.addUser({
                            userData: res.data,
                        })
                    );
                    if (res.data.isAdmin) {
                        navigate("/dashboard");
                    } else {
                        navigate("/home");
                    }
                });
            }
        })

        .catch((err) => {

            setLoginStatus({
                success: false,
                message: "Sorry incorrect Password,or maybe your account is not register yet.",
            });
        });
};

    const googleSuccessLogin = (res) => {
        console.log(res)
    }

    const googleFailedLogin = (err) => {
        console.log(err)
    }

    return (
        <section>
            <div className='grid grid-cols-3'>
            <div className='col-span-2'><img src='././image.png'/></div>
                <div className='container'>
                    <div className='ml-4 mt-40 mb-6'>
                        <img src='././logo.png' className='mb-2'/>
                        <p className='text-xl font-bold mb-2'>Welcome to Binar Car Rental</p>
                    </div>
                    { ( !loginStatus.success && loginStatus.message ) && <p className='text-sm text-red-500 italic'>{loginStatus.message}</p> }
                    <form onSubmit={ handleSubmit(formSubmitHandler) }>
                    <div className="ml-4 mb-4">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="leading-loose border border-solid border-slate-500 block rounded w-80" {...register('user_email', {required: true})} autoComplete="true" data-testid="input-email" />
                        <p className="text-sm text-red-500 italic">{formState.errors.user_email?.type === 'required' && "Email is required"}</p>
                    </div>
                    <div className="ml-4 mb-4">
                        <label htmlFor="user_password">Password</label>
                        <input type="password" name="user_password" id="user_password" className="leading-loose border border-solid border-slate-500 block w-80 rounded" {...register('user_password',  {required: true})} autoComplete="true" data-testid="input-password" />
                        <p className="text-sm text-red-500 italic">{formState.errors.user_password?.type === 'required' && "Password is required"}</p>
                    </div>     
                    <div className="ml-4 mt-6 mb-2">
                        <button type="submit" className="bg-blue-800 w-80 py-2 rounded text-white text-md" data-testid="input-button">Login</button>
                    </div>
                    <p className='ml-4'>Don't have an accout? <Link to="/register" className="text-blue-600">Register Now</Link></p>
                    </form>
                    <GoogleLogin
                        clientId="512247082635-mu6n4g5nq13ju320qn6k5es7v77qbgki.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className='bg-gray-500 w-48 py-2 rounded text-white text-md mt-2 ml-4' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
                        )}
                        onSuccess={googleSuccessLogin}
                        onFailure={googleFailedLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </section>
    )
}

export default Login