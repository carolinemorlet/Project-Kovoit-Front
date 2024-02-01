import CarshareUserList from 'app/components/dashboardUser/carshare/CarshareUserList';
import DisplayEventUSer from 'app/components/dashboardUser/events/DisplayEventUser';

import CardUser from 'app/components/dashboardUser/user/CardUser';
import { Col, Container, Row } from 'reactstrap';

const DashboardUser = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <CardUser />
        <Row>
          <Col xl={6}>
            <DisplayEventUSer />
          </Col>
          <Col xl={6}>
            <CarshareUserList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardUser;
