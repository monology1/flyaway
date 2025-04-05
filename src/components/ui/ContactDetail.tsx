import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactDetailsForm = ({ onChange, validateOnSubmit }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits.")
      .required("Mobile number is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => onChange(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateForm,
        setTouched,
      }) => {
        React.useEffect(() => {
          onChange(values, errors);
        }, [values, errors]);

        React.useEffect(() => {
          if (validateOnSubmit) {
            validateForm().then((validationErrors) => {
              setTouched({
                firstName: true,
                lastName: true,
                mobileNumber: true,
                email: true,
              });
              onChange(values, validationErrors);
            });
          }
        }, [validateOnSubmit]);

        return (
          <Form className="space-y-6">
            <h2 className="text-xl font-semibold text-pink-600 mb-4">
              Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-pink-700">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-700">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-pink-700">
                  Mobile Number
                </label>
                <Field
                  type="text"
                  name="mobileNumber"
                  className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactDetailsForm;
