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
    user: any;
    validateUpdateForm: any;
}

const UpdateUserModal = ({
    show,
    onCloseClick,
    user,
    validateUpdateForm,
}: props) => {
    const [modal, setModal] = useState<boolean>(false);

    const toggle = useCallback(() => {
        setModal(!modal);
    }, [modal]);

    // validation
    const validation: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            lastname: (user && user.lastname) || '',
            firstname: (user && user.firstname) || '',
            email: (user && user.email) || '',
        },
        validationSchema: Yup.object({
            lastname: Yup.string().required('Ce champ est requis'),
            firstname: Yup.string().required('Ce champ est requis'),
            email: Yup.string().required('Ce champ est requis'),
        }),
        onSubmit: (values: any) => {
            const updateChild = {
                id: user.id,
                lastname: values.lastname,
                firstname: values.firstname,
                email: values.email,
            };
            // update user
            validateUpdateForm(updateChild);

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
                        <Row className="form-floating mb-4">
                            <h1>Mise à jour mon profil</h1>
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
                                    name="email"
                                    type="email"
                                    placeholder=""
                                    className="form-control"
                                    id="floatingEmailInput"
                                    value={validation.values.email || ''}
                                />

                                <Label htmlFor="floatingEmailInput">Email</Label>
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

export default UpdateUserModal;
