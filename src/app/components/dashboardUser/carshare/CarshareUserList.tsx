import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Accordion from 'react-bootstrap/Accordion';
import { getEventByUserId } from '../../../services/api/eventsService';

const CarshareUserList = () => {
  // const [activeTab, setActiveTab] = useState<any>('1');
  const [allCarshareList, setAllCarshareList] = useState([]);
  const [carshareList, setCarshareList] = useState({});

  useEffect(() => {
    const loadCarshare = async (): Promise<any> => {
      const response = await getEventByUserId();
      // const test = response?.datas.map((el) => {
      //   return {};
      // });
      // alert('error useEffect carshareList');
      // console.log(
      //   '🚀 ~ file: CarshareUserList.tsx:18 ~ loadCarshare ~ response use effect:',
      //   response
      // );

      
    };
    loadCarshare();
  }, []);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle tag="h2" className="card-title mb-4 ">
            Mes covoiturages
          </CardTitle>

          <Accordion defaultActiveKey="0" flush>
            {/* <Accordion.Item eventKey="0"> */}
            <Accordion.Header>
              <div className="containerCardEvent">
                <div style={{ marginLeft: '50px' }}>
                  <h5>
                    <strong>title</strong>
                  </h5>
                  <h5>le date à heure</h5>
                </div>
              </div>
              <div>
                <ul className="list-inline mb-0 font-size-16">
                  <li className="list-inline-item">
                    <Link to="#" className="text-success p-1">
                      <i className="bx bxs-edit-alt" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="text-danger p-1">
                      <i className="bx bxs-trash" />
                    </Link>
                  </li>
                </ul>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <h5>
                <strong>Détails du covoiturage</strong>
              </h5>
              <p>description</p>
              <p className="detailsCarshare">adresse de l'évènement :</p>
              <p className="detailsCarshare">adresse de départ :</p>
              <p className="detailsCarshare">Date de départ :</p>
              <p className="detailsCarshare">Heure de départ :</p>
              <p className="detailsCarshare">
                Afficher le groupe de son enfant
              </p>
            </Accordion.Body>
            {/* </Accordion.Item> */}
          </Accordion>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CarshareUserList;
