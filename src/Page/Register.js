import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import userSlice from '../store/user'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const Register = () => {

    const { register, handleSubmit, formState } = useForm()
    const [regStatus, setRegStatus] = useState({
        success: false,
        message: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formSubmitHandler = (data) => {
        const postData = {
            email: data.user_email,
            password: data.user_password,
            isAdmin: false
        }

        axios.post('http://localhost:4000/register', postData)
        .then( res => {
            if (typeof res.data.accessToken !== 'undefined'){
                // menyimpan token di localstorage
                localStorage.setItem('binarAccessToken', res.data.accessToken)
                // menyimpan user di redux store
                const user = jwtDecode(res.data.accessToken)
                axios.get(`http://localhost:4000/users/${user.sub}`)
                .then( res => {
                    dispatch( userSlice.actions.addUser({userData: res.data}) )
                    navigate('/home')
                })
            }
            
        }).catch (err => {
            setRegStatus({
                success: false,
                message: 'Sorry, something is wrong. Try again later'
            })
        })
    }

    return (
        <section>
            <div className='grid grid-cols-3'>
            <div className='col-span-2'><img src='././image.png'/></div>
                <div className='container'>
                    <div className='ml-4 mt-40 mb-6'>
                        <img src='././logo.png' className='mb-2'/>
                        <p className='text-xl font-bold mb-2'>Register - Binar Car Rental</p>
                    </div>
                    { ( !regStatus.success && regStatus.message ) && <p className='text-sm text-red-500 italic ml-4'>{regStatus.message}</p> }
                    <form onSubmit={ handleSubmit(formSubmitHandler) }>
                    <div className="ml-4 mb-4">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="leading-loose border border-solid border-slate-500 block rounded w-80" {...register('user_email', {required: true})} autoComplete="true" />
                        <p className="text-sm text-red-500 italic">{formState.errors.user_email?.type === 'required' && "Email is required"}</p>
                    </div>
                    <div className="ml-4 mb-4">
                        <label htmlFor="user_password">Password</label>
                        <input type="password" name="user_password" id="user_password" className="leading-loose border border-solid border-slate-500 block w-80 rounded" {...register('user_password',  {required: true})} autoComplete="true" />
                        <p className="text-sm text-red-500 italic">{formState.errors.user_password?.type === 'required' && "Password is required"}</p>
                    </div>     
                    <div className="ml-4 mt-6 mb-2">
                        <button type="submit" className="bg-blue-800 w-80 py-2 rounded text-white text-md">Register</button>
                    </div>
                    <p className='ml-4'>Have an accout? <Link to="/" className="text-blue-600">Login Now</Link></p>
                    </form>
                </div>
            </div>
        </section>
        
    )
    }

export default Register
