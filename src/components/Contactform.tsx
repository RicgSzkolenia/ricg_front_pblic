import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { User } from "../utils/models/User";
import Button, { ButtonTypes } from "./common/Button";
import clientApi from "../utils/apis/ClientApi";

interface FormFields {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const ContactForm = () => {

    const [ initialValues ] = useState<User>({
        name: '',
        secondName: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        clientApi.getAllClients();
    }, [])

    const handleSubmit = async (values:FormFields) => {
        console.log('submiting');
    }

    return (
        <div>
            <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            >
            <Form>
                <label htmlFor="firstName">Imie</label>
                <Field id="firstName" name="firstName" placeholder="Jane" />

                <label htmlFor="lastName">Nazwisko</label>
                <Field id="lastName" name="lastName" placeholder="Doe" />

                <label htmlFor="email">Email</label>
                <Field
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
                />
                 <label htmlFor="password">Haslo</label>
                  <Field
                id="password"
                name="password"
                placeholder="jane@acme.com"
                type="password"
                />
               <Button type={ButtonTypes.default} height={""} width={""} handleClick={handleSubmit}>Wyslij</Button>
            </Form>
            </Formik>
        </div>
    )
};

export default ContactForm;