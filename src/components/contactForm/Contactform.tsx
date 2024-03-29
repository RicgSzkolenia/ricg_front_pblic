import './contactForm.scss'
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { trackGoogleAnalyticsEvent } from '../../utils/hooks/useAnalytics';

export const StyledButton = styled.button`
    border: 0;
    min-width: 85px;
    max-width: 250px;
    height: 35px;
    background-color: #9c5b89;
    color: #fff;
    cursor: pointer;npm 
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

export const ErrorMessage = styled.div`
    color: tomato;
    margin-left: 10px;
`

export const Message = styled.div`
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
        trackGoogleAnalyticsEvent('contact_form_submited', 'contact_form_submited', 'contact_form_submited', {formData:  JSON.stringify(values) });
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
            onSubmit={(values) => {
                handleSubmit(values)
            }}
            >
                {({ errors, touched }) => (
                    <Form  className="contactForm">
                    <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686685604/logo_White_F_8df86b15c6.svg'/>
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