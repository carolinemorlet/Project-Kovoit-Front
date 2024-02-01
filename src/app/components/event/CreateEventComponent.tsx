import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Label,
  Input,
  Form,
  InputGroup,
} from 'reactstrap';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getGroups } from 'app/services/api/groupsService';

import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';
import { createEvent } from 'app/services/api/eventsService';
import { Link, useNavigate } from 'react-router-dom';

const CreateEventComponent = () => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);

  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const loadGroups = async (): Promise<any> => {
      const response = await getGroups();
      const formatted_datas = response?.datas.map((el: any) => {
        return {
          ...el,
        };
      });
      setGroups(formatted_datas);
    };
    loadGroups();
  }, []);

  const addEvent = async (item) => {
    try {
      const response = await createEvent(item);
      setEvents((prevEvents) => [response, ...prevEvents]);
    } catch (error) {
      console.error(error);
    }
  };

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
      description: '',
      addressdestination: '',
      addresscomplementdestination: '',
      zipdestination: '',
      citydestination: '',
      addressdeparture: '',
      addresscomplementdeparture: '',
      zipdeparture: '',
      citydeparture: '',
      datetimedeparture: '',
      datetimedestination: '',
      groupId: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Ce champ est requis'),
      description: Yup.string().required('Ce champ est requis'),
      addressdestination: Yup.string().required('Ce champ est requis'),
      addresscomplementdestination: Yup.string().optional(),
      zipdestination: Yup.string().required('Ce champ est requis'),
      citydestination: Yup.string().required('Ce champ est requis'),
      addressdeparture: Yup.string().required('Ce champ est requis'),
      addresscomplementdeparture: Yup.string().optional(),
      zipdeparture: Yup.string().required('Ce champ est requis'),
      citydeparture: Yup.string().required('Ce champ est requis'),
      datetimedeparture: Yup.date().required('Ce champ est requis'),
      datetimedestination: Yup.date().required('Ce champ est requis'),
      groupId: Yup.array(),
    }),

    onSubmit: (values: any) => {
      console.log('Form values:', values);
      const newEvent = {
        // id: Math.floor(Math.random() * (30 - 20)) + 20,
        title: values['title'],
        description: values['description'],
        addressdestination: values['addressdestination'],
        addresscomplementdestination: values['addresscomplementdestination'],
        zipdestination: values['zipdestination'],
        citydestination: values['citydestination'],
        addressdeparture: values['addressdeparture'],
        addresscomplementdeparture: values['addresscomplementdeparture'],
        zipdeparture: values['zipdeparture'],
        citydeparture: values['citydeparture'],
        datetimedeparture: values['datetimedeparture'],
        datetimedestination: values['datetimedestination'],
        groupId: values['groupId'],
      };
      addEvent(newEvent);
      validation.resetForm();
      navigate('/listEvent');
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-3">
                    Créer un nouvel évènement
                  </CardTitle>

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      // return false;
                    }}
                  >
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="floatingtitleInput"
                        placeholder=""
                        value={validation.values.title}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                      />
                      <label htmlFor="floatingtitleInput">Titre</label>
                      {validation.errors.title && validation.touched.title ? (
                        <span className="text-danger">
                          {validation.errors.title}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="textarea"
                        name="description"
                        className="form-control"
                        id="floatingDescriptionInput"
                        maxLength={500}
                        placeholder=""
                        value={validation.values.description}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                      />
                      <label htmlFor="floatingtitleInput">Description</label>
                      {validation.errors.description &&
                      validation.touched.description ? (
                        <span className="text-danger">
                          {validation.errors.description}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-floating mb-3">
                      <Label htmlFor="groupSelect">Groupes participants</Label>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={groups.map((el) => ({
                          value: el.name,
                          label: el.name,
                        }))}
                      />
                    </div>

                    <Row>
                      <Col md={6}>
                        <h4 className="bg-info">Informations de départ</h4>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="addressdestination"
                            className="form-control"
                            id="floatingaddressdestinationInput"
                            placeholder=""
                            value={validation.values.addressdestination}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingaddressdestinationInput">
                            Adresse
                          </label>
                          {validation.errors.addressdestination &&
                          validation.touched.addressdestination ? (
                            <span className="text-danger">
                              {validation.errors.addressdestination}
                            </span>
                          ) : null}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="addresscomplementdestination"
                            className="form-control"
                            id="floatingaddresscomplementdestinationInput"
                            placeholder=""
                            value={
                              validation.values.addresscomplementdestination
                            }
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingaddresscomplementdestinationInput">
                            Complément d'adresse
                          </label>
                          {validation.errors.addresscomplementdestination &&
                          validation.touched.addresscomplementdestination ? (
                            <span className="text-danger">
                              {validation.errors.addresscomplementdestination}
                            </span>
                          ) : null}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="zipdestination"
                            className="form-control"
                            id="floatingzipdestinationInput"
                            placeholder=""
                            maxLength={10}
                            value={validation.values.zipdestination}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingzipdestinationInput">
                            Code postal
                          </label>
                          {validation.errors.zipdestination &&
                          validation.touched.zipdestination ? (
                            <span className="text-danger">
                              {validation.errors.zipdestination}
                            </span>
                          ) : null}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="citydestination"
                            className="form-control"
                            id="floatingcitydestinationInput"
                            placeholder=""
                            value={validation.values.citydestination}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingcitydestinationInput">
                            Ville
                          </label>
                          {validation.errors.citydestination &&
                          validation.touched.citydestination ? (
                            <span className="text-danger">
                              {validation.errors.citydestination}
                            </span>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label>Date et heure de l'évènement</Label>
                          <InputGroup>
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="dd-mm-yyyy hh:mm"
                              name="datetimedestination"
                              id="floatingdatetimedestinationInput"
                              options={{
                                enableTime: true,
                                time_24hr: true,
                                minDate: 'today',
                                dateFormat: 'd-m-Y H:i',
                              }}
                              value={validation.values.datetimedestination}
                              onChange={(value) =>
                                validation.handleChange({
                                  target: {
                                    name: 'datetimedestination',
                                    value,
                                  },
                                })
                              }
                              onBlur={validation.handleBlur}
                            />
                          </InputGroup>
                          {validation.errors.datetimedestination &&
                          validation.touched.datetimedestination ? (
                            <span className="text-danger">
                              {validation.errors.datetimedestination}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <h4 className="bg-info">Informations de départ</h4>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="addressdeparture"
                            className="form-control"
                            id="floatingaddressdepartureInput"
                            placeholder=""
                            value={validation.values.addressdeparture}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingaddressdepartureInput">
                            Adresse
                          </label>
                          {validation.errors.addressdeparture &&
                          validation.touched.addressdeparture ? (
                            <span className="text-danger">
                              {validation.errors.addressdeparture}
                            </span>
                          ) : null}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="addresscomplementdeparture"
                            className="form-control"
                            id="floatingaddresscomplementdepartureInput"
                            placeholder=""
                            value={validation.values.addresscomplementdeparture}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingaddresscomplementdepartureInput">
                            Complément d'adresse
                          </label>
                          {validation.errors.addresscomplementdeparture &&
                          validation.touched.addresscomplementdeparture ? (
                            <span className="text-danger">
                              {validation.errors.addresscomplementdeparture}
                            </span>
                          ) : null}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="zipdeparture"
                            className="form-control"
                            id="floatingzipdepartureInput"
                            placeholder=""
                            maxLength={10}
                            value={validation.values.zipdeparture}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingzipdepartureInput">
                            Code postal
                          </label>
                          {validation.errors.zipdeparture &&
                          validation.touched.zipdeparture ? (
                            <span className="text-danger">
                              {validation.errors.zipdeparture}
                            </span>
                          ) : null}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            name="citydeparture"
                            className="form-control"
                            id="floatingcitydepartureInput"
                            placeholder=""
                            value={validation.values.citydeparture}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                          />
                          <label htmlFor="floatingcitydepartureInput">
                            Ville
                          </label>
                          {validation.errors.citydeparture &&
                          validation.touched.citydeparture ? (
                            <span className="text-danger">
                              {validation.errors.citydeparture}
                            </span>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label>Date et heure du départ</Label>
                          <InputGroup>
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="dd-mm-yyyy hh:mm"
                              name="datetimedeparture"
                              id="floatingdatetimedepartureInput"
                              options={{
                                enableTime: true,
                                time_24hr: true,
                                minDate: 'today',
                                dateFormat: 'd-m-Y H:i',
                              }}
                              value={validation.values.datetimedeparture}
                              onChange={(value) =>
                                validation.handleChange({
                                  target: {
                                    name: 'datetimedeparture',
                                    value,
                                  },
                                })
                              }
                              onBlur={validation.handleBlur}
                            />
                          </InputGroup>
                          {validation.errors.datetimedeparture &&
                          validation.touched.datetimedeparture ? (
                            <span className="text-danger">
                              {validation.errors.datetimedeparture}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="btn btn-primary w-md">
                        Valider
                      </button>
                      <Link to="/listEvent">
                        <button
                          type="button"
                          className="btn btn-secondary w-md"
                        >
                          Retour
                        </button>
                      </Link>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default CreateEventComponent;
