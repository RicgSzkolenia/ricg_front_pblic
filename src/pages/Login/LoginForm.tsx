import * as Yup from 'yup';
import Button, { ButtonTypes } from '../../components/common/Button';
import AuthApi from '../../utils/apis/AuthApi';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useState } from 'react';
import { ErrorMessage, Message, StyledButton } from '../../components/contactForm/Contactform';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import authActions from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

const StyledLoginPage = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .contactForm {
        margin: 0;
    }
`

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage ] = useState<string>('');

    const logInSchema = Yup.object().shape({
            password: Yup.string()
             .min(6, 'Too Short!')
             .max(20, 'Too Long!')
            .required('Wymagane'),
            email: Yup.string().email('Invalid email').required('Wymagane'),
         });


    const handleSubmit = (values:FormikValues) => {
        AuthApi.loginRequest(values.email, values.password).then((res:any) => {
            console.log('Result recieved' ,res);
            dispatch(authActions.setUser(res.data.user, res.data.jwt ))
            if (res.data.jwt) {
                navigate('/upload')
            }
        }).catch((e) => {
            console.log(e);
            setMessage(e.response.data.error.message)
        })
    }

    return (
        <StyledLoginPage>
            <img
              src={"/GroupnewColor.svg"}
              style={{ width: "30%", height: "auto" }}
            ></img>
            <Formik initialValues={{ email: '', password: ''}} validationSchema={logInSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form  className="contactForm">
                        <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686685604/logo_White_F_8df86b15c6.svg'/>
                        <Field
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        />
                        <ErrorMessage>
                        {errors.email && touched.email ? ( <div>{errors.email}</div>) : null}
                        </ErrorMessage>
                        <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Haslo"
                        />
                        <ErrorMessage>{errors.password && touched.password ? ( <div>{errors.password}</div>) : null}</ErrorMessage>
                        <Message>{ message }</Message>
                        <StyledButton type="submit" className='contactForm-button'>Wyslij</StyledButton>
                    </Form>
                    )}
            </Formik>
        </StyledLoginPage>
    )
}

export default Login;