import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Accordion from 'react-bootstrap/Accordion';
import { formatDateAndTime } from '../../../utils/FormattedDate';
import { formatAddress } from '../../../utils/FormattedAddress';
import './style.css';

import { getEventById, getEvents } from '../../../services/api/eventsService';
import CreateCarshareModal from '../carshare/modals/CreateCarshareModal';

const DisplayEventUSer = (props: any) => {
  const [events, setEvents] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState<any>({});
  const [kidCount, setKidCount]: any[] = useState(0);
  const [group, setGroup] = useState({});

  useEffect(() => {
    const loadEvents = async (): Promise<any> => {
      const response = await getEvents();

      const response_formatted = response?.datas.map((el) => {
        //addressEvent
        const addressEvent = el.eventAddress
          ? el.eventAddress
          : 'Date non disponible';
        const fullAddressEvent = formatAddress(addressEvent);

        //addressDaparture
        const addressDeparture = el.departureAddress
          ? el.departureAddress
          : 'Date non disponible';
        const fullAddressDeparture = formatAddress(addressDeparture);

        //dateEvent
        const startEvent = el.eDate ? el.eDate.event : 'Date non disponible';
        const formattedDateStart = formatDateAndTime(startEvent);

        //dateDeparture
        const departureEvent = el.eDate
          ? el.eDate.departure
          : 'Date de départ non disponible';
        const formattedDateDeparture = formatDateAndTime(departureEvent);

        let totalKidCount = 0;

        if (Array.isArray(el.groupId)) {
          el.groupId.forEach((group) => {
            if (Array.isArray(group.kidId)) {
              totalKidCount += group.kidId.length;
            }
          });
        }
        return {
          ...el,
          start: formattedDateStart,
          departure: formattedDateDeparture,
          addressEvent: fullAddressEvent,
          addressDeparture: fullAddressDeparture,
          kidCount: totalKidCount,
        };
      });

      setEvents(response_formatted);
    };
    loadEvents();
  }, []);

  const toggle = () => {
    if (modal) {
      setModal(!modal);
      setEvents(events);
    } else {
      setModal(!modal);
    }
  };

  const handleCarshareClick = async (item) => {
    setEvent(item);
    // const response = await getEventById(item._id);
    // const data = response.datas.map()

    toggle();
  };

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle tag="h2" className="card-title mb-4 ">
            Les évènements de l'association
          </CardTitle>

          {events.map((event, index) => (
            <Accordion
              // defaultActiveKey="0" flush
              key={index}
            >
              <Accordion.Header>
                <div className="containerCardEvent">
                  <div className="countKid">
                    <strong>{event.kidCount}</strong>
                  </div>
                  <div style={{ marginLeft: '50px' }}>
                    <h5>
                      <strong>{event.title.toUpperCase()}</strong>
                    </h5>
                    <h5>
                      le {event.start.date} à {event.start.time}
                    </h5>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <h5>
                  <strong>Détails de l'évènement</strong>
                  <Link
                    to="#"
                    className="text-success p-1"
                    onClick={() => {
                      handleCarshareClick(event);
                    }}
                  >
                    <i className="bx bx-car icon-car" id="icon-car" />
                    <UncontrolledTooltip placement="top" target="icon-car">
                      Cliquer ici pour créer un covoiturage
                    </UncontrolledTooltip>
                  </Link>
                </h5>
                <p>{event.description}</p>
                <p className="detailsEvent">
                  adresse de l'évènement : {event.addressEvent}
                </p>
                <p className="detailsEvent">
                  adresse de départ : {event.addressDeparture}{' '}
                </p>
                <p className="detailsEvent">
                  Date de départ : {event.departure.date}{' '}
                </p>
                <p className="detailsEvent">
                  Heure de départ : {event.departure.time}{' '}
                </p>
                <p className="detailsEvent">
                Afficher le groupe de son enfant
                </p>
              </Accordion.Body>
            </Accordion>
          ))}
        </CardBody>
      </Card>
      <CreateCarshareModal
        isOpen={modal}
        className={props.className}
        event={event}
        toggle={toggle}
      />
    </React.Fragment>
  );
};

export default DisplayEventUSer;

// const handleCarshareClick = async (item) => {
//   const response = await getEventById(item._id);

// const totalKids =
//   response && response.datas && Array.isArray(response.datas)
//     ? response.datas.map((el) => {
//         const getGroup = el.groupId;
//         const kidCountByGroup: number[] = [];

//         if (getGroup && Array.isArray(getGroup)) {
//           getGroup.forEach((group) => {
//             if (group.kidId && Array.isArray(group.kidId)) {
//               kidCountByGroup.push(group.kidId.length);
//             } else {
//               kidCountByGroup.push(0);
//             }
//           });
//         }

//         // return el.kidId;
//       })
//     : [];

//   const kidCountByGroup = response?.datas.map((el) => {
//     const getGroup = el.groupId;
//     if (getGroup.kidId && Array.isArray(getGroup.kidId)) {
//       return getGroup.kidId.length;
//     } else {
//       return 0;
//     }
//   });
//   setKidCount(kidCountByGroup);

//   toggle();
// };

// const getGroup = el.groupId;
// const kidCountByGroup: number[] = [];

// if (getGroup && Array.isArray(getGroup)) {
//   getGroup.forEach((group) => {
//     if (group.kidId && Array.isArray(group.kidId)) {
//       kidCountByGroup.push(group.kidId.length);
//     } else {
//       kidCountByGroup.push(0);
//     }
//   });
// }
