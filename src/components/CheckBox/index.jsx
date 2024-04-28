import React from "react";
import { Form } from "react-bootstrap";
import style from "./CheckBox.module.css";

const CustumCheckBox = ({ types }) => {
  return (
    <Form className={style.checkboxAlign}>
      {types?.map(({ type, label }) => (
        <div key={label} className="mb-3">
          <Form.Check
            type={type}
            id={`check-api-${label}`}
            custom // Use custom prop
          >
            <Form.Check.Input type={type} isValid />
            <Form.Check.Label>{`${label}`}</Form.Check.Label>
            <Form.Control.Feedback type="valid">
              {/* Your feedback content */}
            </Form.Control.Feedback>
          </Form.Check>
        </div>
      ))}
    </Form>
  );
};

export default CustumCheckBox;
