import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useResetPasswordMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ChangePassword = () => {
    const { userId, resetString } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const { userInfo } = useSelector((state) => state.auth);



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isError = queryParams.get('error') === 'true';
    const errorMessage = isError ? queryParams.get('message') : null;


    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required('Password is required')
                .matches(
                    /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                    'Password must contain at least 8 characters, one uppercase letter, and one number'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
            const { password, confirmPassword } = values;
            try {
                const res = await resetPassword({
                    password,
                    confirmPassword,
                    userId,
                    resetString,
                });
                if (res.error) {
                    toast.error(res.error.data.message);
                } else {
                    navigate('/login');
                    toast.success('Password Reset Successful, Please Log In To Continue');
                }
            } catch (error) {
                toast.error(error.message);
            }
        },
    });

    return (
        <div className='loginPage'>
            {isError ? (<>
                <h1> Cannot get link</h1>
                <p>{errorMessage}</p>
            </>) : (<>
                <form onSubmit={formik.handleSubmit} className='LoginForm'>
                    <div>
                        <h2>Reset Password</h2>
                    </div>
                    <div className='eachInput'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Enter Password'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{ color: 'red' }}>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className='eachInput'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm Password'
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    {isLoading ? <Loader /> : <button type='submit'>Reset</button>}
                </form>
            </>)}
        </div>
    );
};

export default ChangePassword;
