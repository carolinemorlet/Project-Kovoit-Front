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

interface props {
  show: boolean;
  onCloseClick: () => void;
  association: any;
  validateUpdateAsso: any;
}

const UpdateAssoModal = ({
  show,
  onCloseClick,
  association,
  validateUpdateAsso,
}: props) => {
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  // const formatAddress = (address) => {
  //   const parts = [
  //     address?.street1 || '',
  //     address?.street2 || '',
  //     address?.street3 || '',
  //     address?.zip || '',
  //     address?.city || '',
  //   ];

  //   return (
  //     parts.filter((part) => part !== '').join(', ') || 'adresse non disponible'
  //   );
  // };

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (association && association.name) || '',
      street1: (association && association.street1) || '',
      street2: (association && association.street2) || '',
      zip: (association && association.zip) || '',
      city: (association && association.city) || '',
      phone: (association && association.phone) || '',
      website: (association && association.website) || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Ce champ est requis'),
      street1: Yup.string().lowercase().required('Ce champ est requis'),
      street2: Yup.string().lowercase(),
      zip: Yup.string().lowercase().required('Ce champ est requis'),
      city: Yup.string().lowercase().required('Ce champ est requis'),
      phone: Yup.string(),
      website: Yup.string().url(),
    }),
    onSubmit: (values: any) => {
      const updateAsso = {
        id: association._id,
        name: values.name,
        street1: values.street1,
        street2: values.street2,
        zip: values.zip,
        city: values.city,
        phone: values.phone,
        website: values.website,
      };
      validateUpdateAsso(updateAsso);

      validation.resetForm();
      toggle();
    },
  });

  return (
    <Modal isOpen={show} toggle={onCloseClick}>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row className="form-floating mb-4">
            <div className="form-floating mb-3">
              <Input
                type="text"
                name="name"
                className="form-control"
                id="floatingNameInput"
                placeholder="Nom de l'association"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.name || ''}
                invalid={
                  validation.touched.name && validation.errors.name
                    ? true
                    : false
                }
              />
              <Label htmlFor="floatingNameInput">Nom de l'association</Label>
              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">
                  {validation.errors.name}
                </FormFeedback>
              ) : null}
            </div>
            <Row className="form-floating mb-4">
              <div className="form-floating mb-3">
                <Input
                  className="form-control"
                  id="floatingStreet1Input"
                  placeholder="adresse"
                  name="street1"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.street1 || ''}
                  invalid={
                    validation.touched.street1 && validation.errors.street1
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingStreet1Input">
                  Adresse de l'association
                </Label>
                {validation.touched.street1 && validation.errors.street1 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.street1}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="form-floating mb-3">
                <Input
                  name="street2"
                  type="text"
                  className="form-control"
                  id="floatingStreet2Input"
                  placeholder="Complément d'adresse"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.street2 || ''}
                  invalid={
                    validation.touched.street2 && validation.errors.street2
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingStreet2Input">
                  Complément d'adresse
                </Label>

                {validation.touched.street2 && validation.errors.street2 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.street2}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <Input
                  name="zip"
                  type="text"
                  placeholder="Code postal"
                  className="form-control"
                  id="floatingZipInput"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.zip || ''}
                  invalid={
                    validation.touched.zip && validation.errors.zip
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingZipInput">Code postal</Label>

                {validation.touched.zip && validation.errors.zip ? (
                  <FormFeedback type="invalid">
                    {validation.errors.zip}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <Input
                  name="city"
                  type="text"
                  placeholder="Ville"
                  className="form-control"
                  id="floatingCityInput"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.city || ''}
                  invalid={
                    validation.touched.city && validation.errors.city
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingCityInput">Ville</Label>

                {validation.touched.city && validation.errors.city ? (
                  <FormFeedback type="invalid">
                    {validation.errors.city}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="form-floating mb-3">
                <Input
                  name="phone"
                  type="text"
                  placeholder="Téléphone"
                  className="form-control"
                  id="floatingPhoneInput"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ''}
                  invalid={
                    validation.touched.phone && validation.errors.phone
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingPhoneInput">Téléphone</Label>

                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="form-floating mb-3">
                <Input
                  name="website"
                  type="url"
                  placeholder="Site internet"
                  className="form-control"
                  id="floatingWebsiteInput"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.website || ''}
                  invalid={
                    validation.touched.website && validation.errors.website
                      ? true
                      : false
                  }
                />
                <Label htmlFor="floatingWebsiteInput">
                  Lien vers l'association
                </Label>

                {validation.touched.website && validation.errors.website ? (
                  <FormFeedback type="invalid">
                    {validation.errors.website}
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
                <Button color="primary" type="submit" className="save-asso">
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

export default UpdateAssoModal;
