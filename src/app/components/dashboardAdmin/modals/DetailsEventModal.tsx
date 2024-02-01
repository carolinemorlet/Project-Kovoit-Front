import { deleteEventById } from 'app/services/api/eventsService';
import React, { useState } from 'react';
import { Col, Modal, ModalBody, Row } from 'reactstrap';
import './detailsEventModal.css';
import { Link } from 'react-router-dom';
import DeleteEventModal from './DeleteEventModal';

interface props {
  events: any;
  setEvents: any;
  className: any;
  event: any;
  show: boolean;
  onCloseClick: () => void;
  setEvent: any;
}

const DetailsEventModal = ({
  event,
  show,
  className,
  onCloseClick,
  setEvent,
}: props) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteButtonClick = (item) => {
    setEvent(item);
  };

  const handleDeleteEvent = async (event: any) => {
    try {
      const response = await deleteEventById(event.id);
      console.log(
        '🚀 ~ file: DetailsEventModal.tsx:47 ~ handleDeleteEvent ~ response:',
        response
      );
    } catch (error) {
      console.error(error);
    }

    // let updateEvents = event.delete;
    // setEvents(updateEvents);
    setDeleteModal(!deleteModal);
  };

  // const handleDeleteEvent = async (item: any) => {
  //   try {
  //     const response = await deleteEventById(item._id);
  //     console.log(
  //       '🚀 ~ file: DetailsEventModal.tsx:56 ~ handleDeleteEvent ~ response:',
  //       response
  //     );
  //     //   if (response.status) {
  //     //     let deleteEvent = events.filter((el: any) => el.id !== response);
  //     //     setEvents(deleteEvent);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   // setDeleteModal(!deleteModal);
  // };
  return (
    <Modal
      className={className}
      event={event}
      toggle={onCloseClick}
      centered
      isOpen={show}
    >
      <ModalBody className="p-4">
        <span onClick={onCloseClick} className="buttonCloseX">
          ×
        </span>
        <Row>
          <Col className="col-12 mt-3">
            <h5>Nom de l'énènement</h5>
            <h4>
              <strong>{event.title}</strong>
            </h4>
          </Col>

          <Col className="col-12 mt-3">
            <h5>Date et heure de l'évènement</h5>
            <div className="d-flex align-items-center">
              <div className="col-6">
                <h5>
                  Le <strong>{event.dateEvent}</strong>
                </h5>
              </div>
              <div className="col-6">
                <h5>
                  à <strong>{event.timeEvent}</strong>
                </h5>
              </div>
            </div>
          </Col>

          <Col className="col-12 mt-3">
            <h5>Lieu de l'évènement</h5>
            <h4>
              <strong>{event.addressEvent}</strong>
            </h4>
          </Col>

          <Col className="col-12 mt-3">
            <h5>Date et heure de départ</h5>
            <div className="d-flex align-items-center">
              <div className="col-6">
                <h5>
                  Le <strong>{event.dateDeparture}</strong>
                </h5>
              </div>
              <div className="col-6">
                <h5>
                  à <strong>{event.timeDeparture}</strong>
                </h5>
              </div>
            </div>
          </Col>

          <Col className="col-12 mt-3">
            <h5>Lieu de départ : </h5>
            <h4>
              <strong>{event.addressDeparture}</strong>
            </h4>
          </Col>

          <Col className="col-12 mt-3">
            <div className="mb-3">
              <h5>Groupes participant à l'évènement : </h5>
              {event &&
                event.groupId?.map((group, index) => (
                  <input
                    key={index}
                    type="text"
                    value={group.name}
                    style={{ backgroundColor: group.color }}
                    readOnly
                    className="form-control"
                  />
                ))}
            </div>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col className="col-6">
            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={() => handleDeleteButtonClick(event)}
            >
              Supprimer
            </button>
          </Col>
          <Col className="col-6">
            <Link to={`/edit-event/${event.id}`} className="text-success">
              <button type="button" className="btn btn-primary me-2">
                Modifier
              </button>
            </Link>
          </Col>
        </Row>
      </ModalBody>
      <DeleteEventModal
        event={event}
        show={deleteModal}
        onCloseClick={() => setDeleteModal(!deleteModal)}
        handleDeleteEvent={handleDeleteEvent}
      />
    </Modal>
  );
};

export default DetailsEventModal;
