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

                            <div className="d-flex justify-content-between align-items-center my-2">
                                <div>
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

                                <div className="d-flex flex-column mx-4">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                value="income" />
                                        Bevétel
                                    </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                value="expense" />
                                        Kiadás
                                    </label>
                                    </div>
                                </div>

                                <button className="btn btn-primary" type="submit">
                                    Hozzáadás
                                </button>
                            </div>
                        </Form>}
                </Formik>
            </div>
        </div>
    )
}