import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

interface props {
  show: boolean;
  handleCloseClick: () => void;
  handleAddGroup: (data) => void;
  group: any;
}

const AddGroupModal = ({
  show,
  handleCloseClick,
  handleAddGroup,
  group,
}: props) => {
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (group && group.name) || '',
      color: (group && group.color) || '#556ee6',
      description: (group && group.description) || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().lowercase().required('Ce champ est requis'),
      color: Yup.string(),
      description: Yup.string().required('Ce champ est requis'),
    }),

    onSubmit: (values: any) => {
      const newGroup = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values['name'],
        color: values['color'],
        description: values['description'],
      };
      handleAddGroup(newGroup);

      validation.resetForm();
      toggle();
    },
  });

  return (
    <Modal isOpen={show} toggle={handleCloseClick} centered={true}>
      <ModalHeader tag="h4">Ajouter un groupe</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          <div className="form-floating mb-3">
            <Input
              type="text"
              name="name"
              className="form-control"
              id="floatingNameInput"
              placeholder="Nom"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ''}
              invalid={
                validation.touched.name && validation.errors.name ? true : false
              }
            />
            <Label htmlFor="floatingNameInput">Nom</Label>
            {validation.touched.name && validation.errors.name ? (
              <FormFeedback type="invalid">
                {validation.errors.name}
              </FormFeedback>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <Input
              type="color"
              name="color"
              className="form-control"
              defaultValue="#556ee6"
              id="floatingColorInput"
              // id="example-color-input"
              placeholder="Couleur"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.color || ''}
              invalid={
                validation.touched.color && validation.errors.color
                  ? true
                  : false
              }
            />
            <Label htmlFor="floatingColorInput">Couleur</Label>
            {validation.touched.color && validation.errors.color ? (
              <FormFeedback type="invalid">
                {validation.errors.color}
              </FormFeedback>
            ) : null}
          </div>

          <div className="form-floating mb-3">
            <Input
              type="textarea"
              name="description"
              className="form-control"
              id="floatingDescriptionInput"
              placeholder="Description"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.description || ''}
              invalid={
                validation.touched.description && validation.errors.description
                  ? true
                  : false
              }
            />
            <Label htmlFor="floatingNameInput">Description</Label>
            {validation.touched.description && validation.errors.description ? (
              <FormFeedback type="invalid">
                {validation.errors.description}
              </FormFeedback>
            ) : null}
          </div>

          <Row>
            <Col>
              <div className="text-end">
                <Button
                  type="button"
                  color="primary"
                  className="mx-2"
                  onClick={handleCloseClick}
                >
                  Annuler
                </Button>
                <Button type="submit" color="success" className="save-asso">
                  Creer le groupe
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddGroupModal;
