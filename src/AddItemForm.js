import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from "react";
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
  name: yup.string().required("Név megadása kötelező!").max(100, "Max 100 karakter!"),
  amount: yup.number().required("Összeg megadása kötelező").integer("Egész szám").positive("Pozitív szám")
})

export default function AddItemForm({ addNewItem }) {
  async function onSubmit(values, { resetForm }) {
    addNewItem({
      ...values,
      isExpense: values.type === "expense",
      id: uuidv4()
    });
    resetForm();
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Új tétel</h5>
        <Formik
          initialValues={{
            name: '',
            amount: '',
            type: 'income'
          }}
          onSubmit={onSubmit}
          validationSchema={schema}>
          {({ errors, touched }) =>
            <Form>
              <div className="row">
                <div className="col-12">
                  <Field
                    className={`w-100 form form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                    type="text"
                    name="name"
                    placeholder="Megnevezés">
                  </Field>
                  <ErrorMessage
                    className="text-danger"
                    name="name"
                    component="div" />
                </div>
              </div>

              <div className="row align-items-center my-2">
                <div className="col-4">
                  <Field
                    className={`form form-control ${errors.amount && touched.amount ? 'is-invalid' : ''}`}
                    type="number"
                    name="amount"
                    placeholder="Összeg">
                  </Field>
                  <ErrorMessage
                    className="invalid-feedback"
                    name="amount"
                    component="div" />
                </div>

                <div className="col-3 col-xl-5">
                  <div className="form-check">
                    <label className="form-check-label">
                      <Field
                        className="form-check-input"
                        type="radio"
                        name="type"
                        value="income" />Bevétel</label>
                  </div>

                  <div className="form-check">
                    <label className="form-check-label">
                      <Field
                        className="form-check-input"
                        type="radio"
                        name="type"
                        value="expense" />Kiadás</label>
                  </div>
                </div>

                <div className="col-5 col-xl-3">
                  <button className=" w-100 btn btn-primary" type="submit">
                    Hozzáadás
                </button>
                </div>
              </div>
            </Form>}
        </Formik>
      </div>
    </div>
  )
}