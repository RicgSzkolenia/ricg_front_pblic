import "./contactForm.scss";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { User } from "../../utils/models/User";
import Button, { ButtonTypes } from "../common/Button";
import clientApi from "../../utils/apis/ClientApi";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: string;
}

const ContactForm = () => {
  const [initialValues] = useState({
    name: "",
    secondName: "",
    email: "",
    phone: "",
    topic: "",
  });

  useEffect(() => {
    clientApi.getAllClients();
  }, []);

  const handleSubmit = async (values: FormFields) => {
    console.log("submiting");
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="contactForm">
          <img src="./BigLogo.png"></img>
          <Field id="firstName" name="firstName" placeholder="Imie" />
          <Field id="lastName" name="lastName" placeholder="Nazwisko" />
          <Field id="email" name="email" placeholder="Email" type="email" />
          <Field id="phone" name="phone" placeholder="Telefon" type="text" />
          <Field id="topic" name="topic" placeholder="Temat" type="text" />
          <Button
            className="contactForm-button"
            type={ButtonTypes.default}
            height={""}
            width={""}
            handleClick={handleSubmit}
          >
            Wyslij
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
