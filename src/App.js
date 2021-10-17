import React from 'react';
import { Styles } from './Styles';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
  <label htmlFor={props.id || props.name}>{label}</label>
  <input className="text-input" {...field} {...props} />
  {meta.touched && meta.error ? (
    <div className="error">{meta.error}</div>
  ): null}
    </>
  )
};

const CustomCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props, 'checkbox');

  return (
    <>
  <label className="checkbox">
  <input type="checkbox" {...field} {...props} />
  {children}
  </label>
  {meta.touched && meta.error ? (
    <div className="error">{meta.error}</div>
  ): null}
    </>
  )
}


const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
  <label htmlfor={props.id || props.name}>{label}</label>
  <select {...field} {...props} />
  {meta.touched && meta.error ? (
    <div className="error">{meta.error}</div>
  ): null}
    </>
  )
};

function App() {
  return (
    <Styles>
      <Formik
      initialValues={{
        name: '',
        email: '',
        accepted: '',
        Gender: '',
        SpecialPower:'',

      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(15, 'Must be 3 characters or less')
          .required('Required'),
          email: Yup.string()
          .email('Invalid email adress')
          .required('Required'),
          acceptedTerms: Yup.boolean()
          .required('Required')
          .oneOf([true], 'You must accept the terms and conditions'),
          SpecialPower: Yup.string()
        .oneOf(['flight', 'invisibility', 'wealthy bat guy', 'other'], 'invalid Special Power')
        .required('Required'),
      })}
      handleSubmit={(values, {setSubmitting, resetForm}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 3000)
      }}
      >
       {props => (
         <Form>
           <h1>Sign Up</h1>
           <CustomTextInput label="Name" name="name" type='text'placeholder="Name" />
           <CustomTextInput label="Email" name="Email" type='Email'placeholder="Email" />
           <CustomSelect label="Special Power" name="SpecialPower">
           <option value="">Select a Special Power</option>
           <option value="flight">flight</option>
           <option value="invisibility">invisibility</option>
           <option value="unstoppable strength">unstoppable strength</option>
           <option value="other">other</option>
           </CustomSelect>
           <CustomCheckbox name="acceptedTerms">
            I accept the terms and conditions
            </CustomCheckbox>
            <button type="Submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
           
         </Form>

         
       )} 
        </Formik>
       </Styles>
    );
};

export default App;
