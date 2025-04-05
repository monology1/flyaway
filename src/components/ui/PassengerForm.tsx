import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PassengerForm = ({ passengerCount, onChange, validateOnSubmit, onSubmit, isRoundTrip }) => {
  // Initialize passengers array
  const initialPassengers = Array.from({ length: passengerCount }, () => ({
    title: "",
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    passportNo: "",
  }));

  // Validation schema for passengers
  const validationSchema = Yup.object({
    passengers: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required."),
        firstName: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters and spaces.")
          .required("First name is required."),
        lastName: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, "Last name must contain only letters and spaces.")
          .required("Last name is required."),
        dob: Yup.date()
          .max(new Date(), "Date of birth cannot be in the future.")
          .required("Date of birth is required."),
        nationality: Yup.string()
          .matches(/^[a-zA-Z\s]+$/, "Nationality must contain only letters and spaces.")
          .required("Nationality is required."),
        passportNo: Yup.string()
          .matches(/^[A-Z0-9]{6,9}$/, "Passport number must be 6-9 characters long and contain only uppercase letters and numbers.")
          .required("Passport number is required."),
      })
    ),
  });

  return (
    <Formik
      initialValues={{ passengers: initialPassengers }}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => onSubmit(values.passengers)}
    >
      {({ values, errors, touched, handleChange, handleBlur, validateForm, setTouched }) => {
        // Notify parent of changes and errors
        React.useEffect(() => {
          onChange(values.passengers, errors.passengers || []);
        }, [values, errors, onChange]);

        // Trigger validation on parent form submission
        React.useEffect(() => {
          if (validateOnSubmit) {
            validateForm().then((validationErrors) => {
              const touchedFields = values.passengers.map(() => ({
                title: true,
                firstName: true,
                lastName: true,
                dob: true,
                nationality: true,
                passportNo: true,
              }));
              setTouched({ passengers: touchedFields }); // Mark all fields as touched
              onChange(values.passengers, validationErrors.passengers || []); // Pass updated errors to parent
            });
          }
        }, [validateOnSubmit]);

        return (
          <Form className="space-y-8">
            <h2 className="text-xl font-semibold text-pink-600 mb-6">
              Traveler Details
            </h2>
            {values.passengers.map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-pink-600 mb-4">
                  Passenger {index + 1}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-[15%_30%_30%] gap-6 mb-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700">
                      Title
                    </label>
                    <Field
                      as="select"
                      name={`passengers[${index}].title`}
                      className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    >
                      <option value="">Select</option>
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </Field>
                    <ErrorMessage
                      name={`passengers[${index}].title`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name={`passengers[${index}].firstName`}
                      className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Enter first name"
                    />
                    <ErrorMessage
                      name={`passengers[${index}].firstName`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name={`passengers[${index}].lastName`}
                      className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Enter last name"
                    />
                    <ErrorMessage
                      name={`passengers[${index}].lastName`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700">
                      Date of Birth
                    </label>
                    <Field
                      type="date"
                      name={`passengers[${index}].dob`}
                      className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name={`passengers[${index}].dob`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700">
                      Nationality
                    </label>
                    <Field
                      type="text"
                      name={`passengers[${index}].nationality`}
                      className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Enter nationality"
                    />
                    <ErrorMessage
                      name={`passengers[${index}].nationality`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>

                  {/* Passport Number */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700">
                      Passport Number
                    </label>
                    <Field
                      type="text"
                      name={`passengers[${index}].passportNo`}
                      className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Enter passport number"
                    />
                    <ErrorMessage
                      name={`passengers[${index}].passportNo`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>

                  {/* Baggage Options */}
                  {/* Departure Baggage */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700">
                      Departure Baggage
                    </label>
                    <Field
                      as="select"
                      name={`passengers[${index}].baggage.departure`}
                      className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    >
                      <option value="">Select</option>
                      <option value="0kg">No baggage - +THB 499</option>
                      <option value="15kg">15kg - +THB 999</option>
                      <option value="30kg">30kg  +THB 1499</option>
                    </Field>
                    <ErrorMessage
                      name={`passengers[${index}].baggage.departure`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>

                  {/* Return Baggage (only for round trips) */}
                  {isRoundTrip && (
                    <div>
                      <label className="block text-sm font-medium text-pink-700">
                        Return Baggage
                      </label>
                      <Field
                        as="select"
                        name={`passengers[${index}].baggage.return`}
                        className="mt-1 block w-full px-4 py-2 border border-pink-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      >
                        <option value="">Select</option>
                        <option value="0kg">No baggage - $0</option>
                        <option value="15kg">15kg - $20</option>
                        <option value="30kg">30kg - $35</option>
                      </Field>
                      <ErrorMessage
                        name={`passengers[${index}].baggage.return`}
                        component="p"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Form>
        );
      }}
    </Formik>
  );
};

export default PassengerForm;