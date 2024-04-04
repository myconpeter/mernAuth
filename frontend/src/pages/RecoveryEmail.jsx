import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useResetEmailMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';



const RecoveryEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [resetEmail, { isLoading }] = useResetEmailMutation();

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email is required'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await resetEmail({ email: values.email });
                if (res.error) {
                    toast.error(res.error.data.message);
                } else {
                    navigate('/verifiedlink');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    });

    return (
        <div className='loginPage'>
            <form onSubmit={formik.handleSubmit} className='LoginForm'>
                <div>
                    <h2>Confirm Email Address</h2>
                </div>

                <div className='eachInput'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Enter Email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className='error'>{formik.errors.email}</div>
                    )}
                </div>

                {isLoading ? <Loader /> : <button type='submit'>Reset</button>}
            </form>
        </div>
    );
};

export default RecoveryEmail;
