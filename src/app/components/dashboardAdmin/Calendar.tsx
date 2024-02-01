import '@fullcalendar/react/dist/vdom';
import '@fullcalendar/bootstrap/main.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';

import allLocales from '@fullcalendar/core/locales-all';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './calendar.css';

import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

import { getGroups } from '../../services/api/groupsService';
import { getEvents } from '../../services/api/eventsService';
import DetailsEventModal from './modals/DetailsEventModal';
import { formatDateAndTime } from 'app/utils/FormattedDate';
import { formatAddress } from 'app/utils/FormattedAddress';

const Calendar = (props: any) => {
  const [events, setEvents] = useState<any>([]);
  const [event, setEvent] = useState<any>({});

  const [groups, setGroups]: any = useState([]);
  const [detailsModal, setDetailsModal] = useState(false);

  const [modal, setModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(0);

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

        // if (el.eDate && el.eDate.event) {
        return {
          id: el._id,
          title: el.title,
          start: new Date(el.eDate.event),
          dateEvent: formattedDateStart.date,
          timeEvent: formattedDateStart.time,
          dateDeparture: formattedDateDeparture.date,
          timeDeparture: formattedDateDeparture.time,
          addressEvent: fullAddressEvent,
          addressDeparture: fullAddressDeparture,
          groupId: el.groupId,
          className: 'white-text-event',
        };
      });
      const filteredEvents = response_formatted.filter(
        (event) => event !== null
      );

      setEvents(filteredEvents);
    };
    loadEvents();
  }, []);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvents(events);
    } else {
      setModal(true);
    }
  };

  const handleDateClick = (arg: any) => {
    const date = arg['date'];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );
    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedDay(modifiedData);
    toggle();
  };

  const handleEventClick = async (arg: any) => {
    const eventD: any = arg.event;
    const clickedEvent = events.find((event) => event.id === eventD.id);
    setEvent(clickedEvent);
    setDetailsModal(!detailsModal);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <h2 className="text-center">Calendrier des évènements</h2>

          <Row>
            <Col className="col-12">
              <Row>
                <Col lg={3}>
                  <Card>
                    <CardBody>
                      <div className="d-grid">
                        <Link to="/create-event">
                          <Button color="primary" className="font-16 btn-block">
                            <i className="mdi mdi-plus-circle-outline me-1" />
                            Créer un nouvel évènement
                          </Button>
                        </Link>
                      </div>

                      <div id="external-events" className="mt-2">
                        <br />
                        <p className="text-muted">Les groupes</p>
                        {groups &&
                          groups.map((group: any, index) => (
                            <div
                              className="external-event text-black"
                              style={{ backgroundColor: group.color }}
                              key={index}
                            >
                              <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                              {group.name}
                            </div>
                          ))}
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col className="col-lg-9">
                  <FullCalendar
                    locales={allLocales}
                    locale={'fr'}
                    plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                    slotDuration={'00:15:00'}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,dayGridWeek,dayGridDay',
                    }}
                    events={events}
                    selectable={true}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    initialView="dayGridMonth"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <DetailsEventModal
        events={events}
        setEvents={setEvents}
        setEvent={setEvent}
        event={event}
        show={detailsModal}
        className={props.className}
        onCloseClick={() => setDetailsModal(!detailsModal)}
      />
    </React.Fragment>
  );
};

export default Calendar;
