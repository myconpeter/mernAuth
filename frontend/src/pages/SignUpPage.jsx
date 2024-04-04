import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/userApiSlice';


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});


const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const { name, email, password } = values;
            const res = await register({ name, email, password });

            if (res.error) {
                toast.error(res.error.data.message);
            } else {
                navigate('/verifiedlink');
            }
        },
    });

    return (
        <div className='loginPage'>
            <form onSubmit={formik.handleSubmit} className='LoginForm'>
                <div>
                    <h2>Sign Up</h2>
                </div>

                <div className='eachInput'>
                    <label htmlFor='name'>Full Name</label>
                    <input type='text' id='name' {...formik.getFieldProps('name')} />
                    {formik.touched.name && formik.errors.name ? <div style={{ color: 'red' }} className='error'>{formik.errors.name}</div> : null}
                </div>

                <div className='eachInput'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' id='email' {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }} className='error'>{formik.errors.email}</div> : null}
                </div>

                <div className='eachInput'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: 'red' }} className='error'>{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className='eachInput'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' {...formik.getFieldProps('confirmPassword')} />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div style={{ color: 'red' }} className='error'>{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>

                {isLoading ? <Loader /> : <button type='submit'>Register</button>}

                <div className='newCustomer'>
                    <p>Already have an Account ?</p>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
