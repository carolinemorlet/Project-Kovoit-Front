import React, { useState, useCallback } from 'react';

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  Button,
} from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

interface props {
  show: boolean;
  onCloseClick: () => void;
  validateCreateForm: (data) => void;
  child: any;
}

const CreateModal = ({
  show,
  onCloseClick,
  validateCreateForm,
  child,
}: props) => {
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      lastname: '',
      firstname: '',
      birthdate: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      lastname: Yup.string().lowercase().required('Ce champ est requis'),
      firstname: Yup.string().required('Ce champ est requis'),
      birthdate: Yup.string().required('Ce champ est requis'),
      email: Yup.string().email(),
      phone: Yup.string().required('Ce champ est requis'),
    }),

    onSubmit: (values: any) => {
      const newChild = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        lastname: values['lastname'],
        firstname: values['firstname'],
        birthdate: values['birthdate'],
        phone: values['phone'],
        email: values['email'],
      };
      validateCreateForm(newChild);
      validation.resetForm();
      toggle();
    },
  });


  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader tag="h4">Ajouter un enfant</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          <Row className="form-floating mb-4">
            <div className="form-floating mb-3">
              <Input
                type="text"
                name="lastname"
                className="form-control"
                id="floatinglastnameInput"
                placeholder="Nom"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.lastname || ''}
                invalid={
                  validation.touched.lastname && validation.errors.lastname
                    ? true
                    : false
                }
              />
              <Label htmlFor="floatinglastnameInput">Nom</Label>
              {validation.touched.lastname && validation.errors.lastname ? (
                <FormFeedback type="invalid">
                  {validation.errors.lastname}
                </FormFeedback>
              ) : null}
            </div>
            <Row className="form-floating mb-4">
              <div className="form-floating mb-3">
                <Input
                  className="form-control"
                  id="floatingfirstnameInput"
                  placeholder="prénom"
                  name="firstname"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.firstname || ''}
                  invalid={
                    validation.touched.firstname && validation.errors.firstname
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingfirstnameInput">Prénom</Label>
                {validation.touched.firstname && validation.errors.firstname ? (
                  <FormFeedback type="invalid">
                    {validation.errors.firstname}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="form-floating mb-3">
                <Input
                  name="birthdate"
                  type="date"
                  className="form-control"
                  id="floatingbirthdateInput"
                  placeholder="Date de naissance"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.birthdate || ''}
                  invalid={
                    validation.touched.birthdate && validation.errors.birthdate
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingbirthdateInput">
                  Date de naissance
                </Label>

                {validation.touched.birthdate && validation.errors.birthdate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.birthdate}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <Input
                  name="email"
                  type="email"
                  className="form-control"
                  id="floatingEmailInput"
                  placeholder="Email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ''}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingEmailInput">
                  Email du responsable légal
                </Label>

                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <Input
                  name="phone"
                  type="text"
                  placeholder="Téléphone"
                  className="form-control"
                  id="floatingphoneInput"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ''}
                  invalid={
                    validation.touched.phone && validation.errors.phone
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingphoneInput">Téléphone</Label>

                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <Button
                  type="submit"
                  color="primary"
                  className="mx-2"
                  onClick={onCloseClick}
                >
                  Annuler
                </Button>
                <Button type="submit" color="success" className="save-asso">
                  Creer la fiche enfant
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CreateModal;
