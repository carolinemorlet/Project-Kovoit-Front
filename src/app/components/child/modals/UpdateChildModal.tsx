import React, { useState, useCallback } from 'react';

import {
  Col,
  Row,
  Modal,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  Button,
} from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {  formatDateString } from 'app/utils/FormattedDate';

interface props {
  show: boolean;
  onCloseClick: () => void;
  child: any;
  validateUpdateForm: any;
}

const UpdateModal = ({
  show,
  onCloseClick,
  child,
  validateUpdateForm,
}: props) => {
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      lastname: (child && child.lastname) || '',
      firstname: (child && child.firstname) || '',
      birthdate:
        child && child.birthdate && child.birthdate.date
          ? formatDateString(child.birthdate.date)
          : '',
      email: (child && child.email) || 'mail non disponible',
      phone: (child && child.phone) || '',
    },
    validationSchema: Yup.object({
      lastname: Yup.string().required('Ce champ est requis'),
      firstname: Yup.string().required('Ce champ est requis'),
      birthdate: Yup.string().required('Ce champ est requis'),
      email: Yup.array(),
      phone: Yup.string().required('Ce champ est requis'),
    }),
    onSubmit: (values: any) => {
      console.log('Submitting values:', values);
      const updateChild = {
        id: child._id,
        lastname: values.lastname,
        firstname: values.firstname,
        birthdate: values.birthdate,
        email: values.email,
        phone: values.phone,
      };
      validateUpdateForm(updateChild);
      console.log('Validating updateChild:', updateChild);
      validation.resetForm();
      toggle();
    },
  });

  return (
    <Modal isOpen={show} toggle={onCloseClick}>
      <ModalBody>
        <h5>Modification des informations</h5>
        <Form
          onSubmit={(e) => {
            // e.preventDefault();
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
                value={validation.values.lastname}
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
                  value={validation.values.firstname}
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
                  id="floatingBirthdateInput"
                  placeholder=""
                  onChange={(e) => {
                    console.log('Setting birthdate:', e.target.value);
                    validation.setFieldValue('birthdate', e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.birthdate}
                  invalid={
                    validation.touched.birthdate && validation.errors.birthdate
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingBirthdateInput">
                  Date de naissance
                </Label>

                {validation.touched.birthdate && validation.errors.birthdate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.birthdate}
                  </FormFeedback>
                ) : null}
              </div>
              ;
              <div className="form-floating mb-3">
                <Input
                  name="email"
                  type="email"
                  placeholder=""
                  className="form-control"
                  id="floatingEmailInput"
                  value={validation.values.email}
                />

                <Label htmlFor="floatingEmailInput">Email</Label>
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
                  value={validation.values.phone}
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
                  color="primary"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={onCloseClick}
                >
                  Annuler
                </Button>
                <Button color="primary" type="submit" className="save-child">
                  Valider les modifications
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default UpdateModal;
