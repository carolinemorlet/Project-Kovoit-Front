import React, { useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import logo from '../../../assets/images/kovoit.png';

import { Link, useNavigate } from 'react-router-dom';

import { createAssociation } from '../../services/api/association';

import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import { createUser } from 'app/services/api/auth';

const SignUp = () => {
  const [createAsso, setcreateAsso] = useState(false);
  const navigate = useNavigate();

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      associationName: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Prénom requis'),
      lastname: Yup.string().required('Nom requis'),
      email: Yup.string().email().required('Email requis'),
      password: Yup.string().required('Password requis'),
      associationName: Yup.string()
    }),

    onSubmit: async (values: any) => {
      console.log('values', values);
      const response = await createUser(values);
      if (response.status) {
        if (createAsso) {
          //insert userId
          await createAssociation({
            name: values.association,
            userId: '',
          });
        }
        navigate('/dashboard');
      }
    },
  });

  const handleSwitch = () => {
    setcreateAsso(!createAsso);
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Inscription</h5>
                        <p>Inscrivez vous pour accéder à l'application</p>
                      </div>
                    </Col>
                    <Col className="col-5 h50">
                      <img src={logo} alt="" className="img-fluid h-00" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Prénom</Label>
                        <Input
                          name="firstname"
                          type="text"
                          placeholder="Entrez votre Prénom"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstname || ''}
                          invalid={
                            validation.touched.firstname &&
                            validation.errors.firstname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.firstname &&
                        validation.errors.firstname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.firstname}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Nom</Label>
                        <Input
                          name="lastname"
                          type="text"
                          placeholder="Entrez votre nom"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastname || ''}
                          invalid={
                            validation.touched.lastname &&
                            validation.errors.lastname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.lastname &&
                        validation.errors.lastname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.lastname}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Entrez votre email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ''}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Mot de passe</Label>
                        <Input
                          name="password"
                          autoComplete="off"
                          type="password"
                          placeholder="Entrez votre password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ''}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check form-switch form-switch-md mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customSwitchsizemd"
                          onChange={handleSwitch}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customSwitchsizemd"
                        >
                          Je veux créer une association
                        </label>
                      </div>
                      {createAsso && (
                        <div className="mb-3">
                          <Label className="form-label">
                            Nom de l'association à créer
                          </Label>
                          <Input
                            name="associationName"
                            autoComplete="off"
                            type="text"
                            placeholder="Entrez le nom de l'association"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.associationName || ''}
                            invalid={
                              validation.touched.associationName &&
                              validation.errors.associationName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.associationName &&
                          validation.errors.associationName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.associationName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      )}

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Valider
                        </button>
                      </div>

                      <div className="my-2">
                        Deja un compte
                        <Link to="/" className="fw-medium text-primary mx-2">
                          Se connecter
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
