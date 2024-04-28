// CustumRadio.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
const CustumRadio = ({ label, type = "radio" }) => {
  return (
    <Form.Check type={type} id={`check-api-${type}`}>
    <Form.Check.Input type={type} isInvalid name='assign'/>
  </Form.Check>
  );
};
export default CustumRadio;
