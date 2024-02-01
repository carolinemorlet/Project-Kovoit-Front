import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledTooltip,
  Badge,
  Col,
  Row,
  Button,
} from 'reactstrap';

import { getEvents, deleteEventById } from '../../services/api/eventsService';
import DeleteEventModal from 'app/components/event/modals/DeleteModalEvent';
import { Link } from 'react-router-dom';
import { formatAddress } from 'app/utils/FormattedAddress';
import { formatDateAndTime } from 'app/utils/FormattedDate';

const ListEvent = () => {
  const [events, setEvents]: any = useState([]);
  const [event, setEvent]: any = useState({});
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const loadEvents = async (): Promise<any> => {
      const response = await getEvents();

      const formatted_datas = response?.datas.map((el: any) => {
        const eventAddress = el.eventAddress
          ? el.eventAddress
          : 'Adresse non disponible';
        const fullAddress = formatAddress(eventAddress);

        const departureAddress = el.departureAddress
          ? el.departureAddress
          : 'Adresse non disponible';
        const fullDepartureAddress = formatAddress(departureAddress);

        const startEvent = el.eDate ? el.eDate.event : 'Date non disponible';
        const formattedDateStart = formatDateAndTime(startEvent);

        const departureEvent = el.eDate
          ? el.eDate.departure
          : 'Date de départ non disponible';
        const formattedDateDeparture = formatDateAndTime(departureEvent);

        return {
          ...el,
          address: fullAddress,
          start: formattedDateStart,
          departure: formattedDateDeparture,
          departureAddress: fullDepartureAddress,
        };
      });
      setEvents(formatted_datas);
    };
    loadEvents();
  }, []);

  const handleDeleteButtonClick = async (item) => {
    setEvent(item);
    setDeleteModal(!deleteModal);
  };

  const deleteEvent = async (item: any) => {
    try {
      const response = await deleteEventById(item._id);
      if (response.status) {
        let deleteEvent = events.filter((el: any) => el.id !== response);
        setEvents(deleteEvent);
      }
    } catch (error) {
      alert("Erreur au moment de la suppression de l'évènement");
    }

    setDeleteModal(!deleteModal);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="text-center">Liste des évènements</h2>
          <div className="d-grid">
            <Link to="/create-event">
              <Button color="primary" className="font-16 btn-block">
                Créer un nouvel évènement
              </Button>
            </Link>
          </div>
          {events?.length > 0 &&
            events?.map((item, index) => (
              <Row xs={12} key={index}>
                <Col xs={12}>
                  <Card>
                    <CardTitle>
                      <div>
                        <div className="d-flex justify-content-evenly border-bottom bg-info">
                          <h3 className="text-center">{item.title}</h3>
                          <div className="text-center">
                            <i className="bx bx-calendar me-1" />
                            {item.departure.date}
                          </div>
                          <div className="text-center">
                            <i className="bx bx-calendar me-1" />
                            {item.departure.time}
                          </div>
                          <div>
                            <Link
                              to={`/edit-event/${item._id}`}
                              className="text-secondary me-2"
                            >
                              <i
                                className="mdi mdi-pencil font-size text-secondary"
                                id="edittooltip"
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target="edittooltip"
                              >
                                Modifier
                              </UncontrolledTooltip>
                            </Link>
                            <Link
                              to="#"
                              className="text-success"
                              onClick={() => handleDeleteButtonClick(item)}
                            >
                              <i
                                className="mdi mdi-trash-can font-size-16 text-danger"
                                id="deletetooltip"
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target="deletetooltip"
                              >
                                Supprimer
                              </UncontrolledTooltip>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardTitle>

                    <CardBody>
                      <Row>
                        <div className="d-flex">
                          <div className="">
                            <h5 className="mb-4 text-center">
                              {item.description}
                            </h5>
                          </div>

                          <div className="px-4">
                            <ul className="list-inline mb-0">
                              {item.groupId.map((el) => (
                                <li className="list-inline-item me-3 ">
                                  <Badge className={'bg-' + el?.color}>
                                    {el?.name}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <Col xs={12} lg={6}>
                          <div>
                            <h4 className="">Informations de l'évènement</h4>
                            <h5 className="text-muted mb-4">{item.address}</h5>
                          </div>
                        </Col>

                        <Col xs={12} lg={6}>
                          <div>
                            <h4>Informations sur le départ</h4>
                            <h5 className="text-muted mb-4">
                              {item.departureAddress}
                            </h5>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ))}
        </div>
      </div>
      <DeleteEventModal
        event={event}
        show={deleteModal}
        onCloseClick={() => setDeleteModal(false)}
        validateDeleteEvent={deleteEvent}
      />
    </React.Fragment>
  );
};

export default ListEvent;
