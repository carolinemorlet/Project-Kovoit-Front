import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import UpdateUserModal from './modals/UpdateUserModal';
import { getUserById } from 'app/services/api/user';

//Import Images

function CardUser() {
  const [settingsMenu, setSettingsMenu] = useState<any>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [user, setUser]: any = useState({});
  const [users, setUsers]: any = useState([]);
  useEffect(() => {
    const test: any = localStorage.getItem('authUser');
    // console.log('test', JSON.parse(test));
    setUser(JSON.parse(test));
  }, []);

  const handleUpdateButtonClick = async (id: any) => {
    const response = await getUserById(Number(id));
    // console.log('responsedata', response?.datas);

    const test = {
      firstname: response?.datas?.firstname,
      lastname: response?.datas?.lastname,
      email: response?.datas?.email,
      password: response?.datas?.password,
      status: response?.datas?.status,
      assoId: response?.datas?.roles[0].assoId,
      role: response?.datas?.roles[0].role,
      all_event_available: response?.datas?.all_event_available,
    };
    setUser(test);
    setUpdateModal(!updateModal);
  };

  const updateUser = (data: any) => {
    const updateUser = [...users];
    const index = updateUser.findIndex((el: any) => el.id === data.id);
    updateUser.splice(index, 1, data);
    setUsers(updateUser);
    setUpdateModal(!updateModal);
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Row>
                <Col lg={4}>
                  <div className="d-flex">
                    <div className="me-3"></div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2">Bienvenue sur Kovoit</p>
                        <h5 className="mb-1">{user.firstname}</h5>
                        <h5 className="mb-1">{user.lastname}</h5>
                        <h5 className="mb-1">{user.email}</h5>
                        {/* <p className="mb-0">
                          association {user.roles[0].assoId}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg={4} className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      <Col xs={4}>
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Mes covoiturages
                          </p>
                          <h5 className="mb-0">4</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg={4} className="d-none d-lg-block">
                  <div className="clearfix mt-4 mt-lg-0">
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu);
                      }}
                      className="float-end"
                    >
                      <DropdownToggle
                        tag="button"
                        className="btn btn-primary"
                        onClick={() => handleUpdateButtonClick('authUser')}
                      >
                        <i className="bx bxs-cog align-middle me-1" /> Mettre à
                        jour mon profil
                      </DropdownToggle>
                      {/* <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Mon profil</DropdownItem>
                        <DropdownItem href="#">Mes covoiturages</DropdownItem>
                      </DropdownMenu> */}
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <UpdateUserModal
        show={updateModal}
        onCloseClick={() => setUpdateModal(false)}
        user={user}
        validateUpdateForm={updateUser}
      />
    </React.Fragment>
  );
}

export default CardUser;
