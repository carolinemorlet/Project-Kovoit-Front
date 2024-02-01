import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  Form,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap';

interface props {
  isOpen: boolean;
  event: any;
  className: any;
  toggle: () => void;
}
function CreateCarshareModal({ isOpen, event, className, toggle }: props) {
  const [count, setCount] = useState(0);
  const [kidCount, setKidCount] = useState(Number(event?.kidCount));

  const decremente = () => {
    if (count > 0) {
      setCount(count - 1);
      setKidCount(kidCount + 1);
    }
  };

  const incremente = () => {
    if (count < event.kidCount) {
      setCount(count + 1);
      setKidCount(kidCount - 1);
    }
  };

  const onSubmit = () => {
    console.log('clicked covoit');
  };

  return (
    <Modal isOpen={isOpen} event={event} centered>
      <ModalHeader tag="h4">Créer un covoiturage</ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col className="align-self-center mb-5" lg={12}>
                      <div className="text-lg-center mt-4 mt-lg-0">
                        <h4>
                          <strong>{event.title}</strong>
                        </h4>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="text-lg-center mb-5">
                        <h5 className="text-muted text-truncate mb-3">
                          Nombre d'enfants à covoiturer
                        </h5>
                        <div className="text-lg-center mb-5">
                          <h5 className="mb-0">{event.kidCount}</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Col lg={12}>
                    <div className="text-lg-center mb-5">
                      <h5 className="text-muted text-truncate mb-3">
                        Nombre de places que vous souhaitez prendre
                      </h5>
                      <div className="d-flex mb-5">
                        <Button color="primary" onClick={decremente}>
                          -
                        </Button>
                        <h1 className="mx-4">{count}</h1>
                        <Button color="primary" onClick={incremente}>
                          +
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Row className="col-mr-20">
                    <div className="text-end"></div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Button
            color="secondary"
            className="btn btn-primary waves-effect waves-light"
            onClick={toggle}
          >
            Annuler
          </Button>
          <Button color="primary" type="submit" className="save-carshare">
            Covoiturons
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default CreateCarshareModal;

// const handleValidateCarshare = (data) => {
//   console.log('data', data);
//   const { date, title, address, numberOfSeats } = allCarshareData;
//   const newCarpool =
//     {
//       date,
//       title,
//       address,
//       numberOfSeats,
//     },

//   newCarpool.push(data);
//   setCarshareData(newCarpool);
//   // toggle();
// };
