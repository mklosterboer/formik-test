import React from "react";
import "./App.css";
import { Formik, Field, Form, FieldArray } from "formik";
import {
    TextField,
    Button,
    Checkbox,
    FormLabel,
    InputLabel,
    Radio,
    Select,
    MenuItem
} from "@material-ui/core";
import { MyRadio } from "./Components/MyRadio";
import { MyTextField } from "./Components/MyTextField";

const App: React.FC = () => {
    return (
        <div className="form-wrapper">
            <Formik
                initialValues={{
                    firstName1: "",
                    firstName2: "",
                    lastName: "",
                    isTall: true,
                    cookies: [],
                    yogurt1: "",
                    yogurt2: "",
                    pets: [{ type: "cat", name: "Jarvis", id: "" + Math.random() }]
                }}
                validate={values => {
                    const errors: Record<string, string> = {};

                    if (values.firstName2.includes("bob")) {
                        errors.firstName2 = "No Bob";
                    }
                    return errors;
                }}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    // make async call
                    setTimeout(() => {
                        setSubmitting(false);
                        console.log(data);
                        resetForm();
                    }, 2000);
                }}
            >
                {({ values, isSubmitting, errors }) => (
                    <Form>
                        <div>
                            <Field
                                placeholder={"First Name"}
                                name="firstName1"
                                type="input"
                                as={TextField}
                            />
                        </div>
                        <div>
                            <MyTextField
                                placeholder={"First Name"}
                                name="firstName2"
                                type="input"
                                as={TextField}
                            />
                        </div>
                        <div>
                            <Field
                                placeholder={"Last Name"}
                                name="lastName"
                                type="input"
                                as={TextField}
                            />
                        </div>
                        <div>
                            <FormLabel>Is Tall</FormLabel>
                            <Field name="isTall" type="checkbox" as={Checkbox} />
                        </div>
                        <div>
                            <InputLabel>Cookies:</InputLabel>
                            <FormLabel>Chocolate</FormLabel>
                            <Field name="cookies" type="checkbox" value="Chocolate" as={Checkbox} />
                            <br />
                            <FormLabel>Sugar</FormLabel>
                            <Field name="cookies" type="checkbox" value="Sugar" as={Checkbox} />
                            <br />
                            <FormLabel>Snickerdoodle</FormLabel>
                            <Field
                                name="cookies"
                                type="checkbox"
                                value="Snickerdoodle"
                                as={Checkbox}
                            />
                        </div>
                        <br />
                        <div>
                            <InputLabel>Yogurt</InputLabel>
                            <FormLabel>Banana</FormLabel>
                            <Field name="yogurt1" type="radio" value="Banana" as={Radio} />
                            <br />
                            <FormLabel>Strawberry</FormLabel>
                            <Field name="yogurt1" type="radio" value="Strawberry" as={Radio} />
                            <br />
                            <FormLabel>Vanilla</FormLabel>
                            <Field name="yogurt1" type="radio" value="Vanilla" as={Radio} />
                        </div>
                        <br />
                        <div>
                            <InputLabel>Yogurt</InputLabel>
                            <MyRadio name="yogurt2" type="radio" value="Banana" label="Banana" />
                            <MyRadio
                                name="yogurt2"
                                type="radio"
                                value="Strawberry"
                                label="Strawberry"
                            />
                            <MyRadio name="yogurt2" type="radio" value="Vanilla" label="Vanilla" />
                        </div>
                        <div>
                            <FieldArray name="pets">
                                {arrayHelpers => (
                                    <div className="pet-wrapper">
                                        <Button
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    type: "frog",
                                                    name: "",
                                                    id: "" + Math.random()
                                                })
                                            }
                                        >
                                            Add Pet
                                        </Button>
                                        {values.pets.map((pet, idx) => {
                                            const name = `pets.${idx}.name`;
                                            return (
                                                <div key={pet.id}>
                                                    <MyTextField
                                                        name={name}
                                                        placeholder="Pet Name"
                                                    />
                                                    <Field
                                                        name={`pets.${idx}.type`}
                                                        type="select"
                                                        as={Select}
                                                    >
                                                        <MenuItem value="cat">Cat</MenuItem>
                                                        <MenuItem value="dog">Dog</MenuItem>
                                                        <MenuItem value="frog">Frog</MenuItem>
                                                    </Field>
                                                    <Button
                                                        onClick={() => arrayHelpers.remove(idx)}
                                                    >
                                                        x
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <div>
                            <Button disabled={isSubmitting} type="submit">
                                submit
                            </Button>
                        </div>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default App;
