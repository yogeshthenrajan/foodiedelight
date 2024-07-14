import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
    email: yup.string().
        required('Email is required !').
        email('Invalid email !'),
    password: yup.string().
        required('Password is required !')
})