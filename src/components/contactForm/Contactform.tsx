import './contactForm.scss'
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';

const StyledButton = styled.button`
border: 0;
min-width: 85px;
max-width: 250px;
height: 35px;
background-color: #954580;
color: #fff;
cursor: pointer;
padding: 0 15px;
text-align: center;
line-height: 35px;
margin: 5px;
border-radius: 10px;
font-size: 20px;
transition: 0.3s ease-in-out;
&:hover {
    transform: scale(1.06);
    background-color: #6149F5;
}
@media only screen and (max-width: 376px) {
    font-size: 14px;
    width: 185px !important;
    height: 30px;
    line-height: 30px;
}

@media only screen and (min-width: 377px) and (max-width: 480px) {
    font-size: 14px;
    width: 150px;
    height: 25px !important;
    line-height: 25px !important;

}

@media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 16px;
    width: 250px;
}


@media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 16px;
    width: 200px;
}
`

const ErrorMessage = styled.div`
    color: tomato;
    margin-left: 10px;
`

const Message = styled.div`
    width: 50%;
    text-align: center;
    margin: 0 auto;
    color: #000;
    text-transform: uppercase;
`
interface FormFields {
    name: string,
    surName: string,
    email: string,
    topic: string,
}

const ContactForm = () => {
    const [message, setMessage ] = useState<string>('')
    const [ initialValues ] = useState({
        name: '',
        surName: '',
        email: '',
        topic: ''
    })

    const handleSubmit = async (values:FormFields) => {
        console.log('submiting', values);
        axios.post(`${process.env.REACT_APP_BASE_URL}/contact-requests`, {data: {...values}}).then(() => {
            setMessage('Wyslano')
        })
    }

    useEffect(() => {
        if (message !== '') {
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }
    }, [message])

    const ContactSchema = Yup.object().shape({
        name: Yup.string()
             .min(2, 'Too Short!')
             .max(50, 'Too Long!')
             .required('Required'),
             surName: Yup.string()
             .min(2, 'Too Short!')
             .max(50, 'Too Long!')
             .required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
         });

    return (
        <div className='form'>
            <Formik
            validationSchema={ContactSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
                handleSubmit(values)
            }}
            >
                {({ errors, touched }) => (
                    <Form  className="contactForm">
                    <img src='./BigLogo.png'></img>   
                    <Field id="name" name="name" placeholder="Imie" />
                    <ErrorMessage>{errors.name && touched.name ? ( <div>{errors.name}</div>) : null}</ErrorMessage>
                    <Field id="surName" name="surName" placeholder="Nazwisko" />
                    <ErrorMessage>{errors.name && touched.name ? ( <div>{errors.surName}</div>) : null}</ErrorMessage>
                    <Field
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    />
                    <ErrorMessage>
                      {errors.name && touched.name ? ( <div>{errors.email}</div>) : null}
                      </ErrorMessage>
                    <Field
                    id="topic"
                    name="topic"
                    placeholder="Temat"
                    />
                    <ErrorMessage>{errors.name && touched.name ? ( <div>{errors.topic}</div>) : null}</ErrorMessage>
                    <Message>{ message }</Message>
                    <StyledButton type="submit" className='contactForm-button'>Wyslij</StyledButton>
                </Form>
                )}
       
            </Formik>
        </div>
    )
};

export default ContactForm;