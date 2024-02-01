import React, { useState, useEffect } from 'react';
import { Table, Card, CardBody, Button, UncontrolledTooltip } from 'reactstrap';

import {
  createGroup,
  deleteGroupById,
  getGroups,
} from '../../services/api/groupsService';
import { Link } from 'react-router-dom';
import AddGroupModal from './modals/AddGroupModal';
import DeleteGroupModal from './modals/DeleteGroupModal';

const ListGroups = () => {
  const [groups, setGroups]: any = useState([]);
  const [group, setGroup]: any = useState({});
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const loadGroups = async (): Promise<any> => {
      const response = await getGroups();
      setGroups(response.datas);
    };
    loadGroups();
  }, []);

  const handleAddButtonClick = () => {
    setAddModal(!addModal);
  };

  const handleDeleteButtonClick = async (item) => {
    setGroup(item);
    setDeleteModal(!deleteModal);
  };

  const handleAddGroup = async (data: any) => {
    try {
      const response = await createGroup(data);
      setGroups([...groups, response.datas]);
    } catch (error) {
      alert('Erreur au moment de la création du groupe');
    }
    setAddModal(!addModal);
  };

  const handleDeleteGroup = async (item: any) => {
    try {
      const response = await deleteGroupById(item._id);
      if (response.status) {
        let deleteGroup = groups.filter((el: any) => el.id !== response);
        setGroups(deleteGroup);
      }
    } catch (error) {
      alert('Erreur au moment de la création du groupe');
    }
    setDeleteModal(!deleteModal);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="text-center">Liste des groupes</h2>
          <Card>
            <CardBody>
              <div className="d-sm-flex flex-wrap">
                <span className="text-sm-end ms-auto">
                  <Button
                    type="button"
                    className="btn btn-soft-success waves-effect waves-light"
                    onClick={() => handleAddButtonClick()}
                  >
                    <i className="mdi mdi-plus font-size-16 align-middle me-2" />
                    Créer un groupe
                  </Button>
                </span>
              </div>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Description</th>
                      <th>Nombre d'enfants</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.kidId?.length}</td>
                        <td>
                          <Link
                            to={`/edit-group/${item._id}`}
                            className="text-success"
                          >
                            <i
                              className="mdi mdi-pencil font-size-16 text-success me-1"
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
                              className="mdi mdi-trash-can font-size-16 text-danger me-1"
                              id="deletetooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="deletetooltip"
                            >
                              Supprimer
                            </UncontrolledTooltip>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
        <AddGroupModal
          show={addModal}
          handleCloseClick={() => setAddModal(!addModal)}
          handleAddGroup={handleAddGroup}
          group={group}
        />
        <DeleteGroupModal
          group={group}
          show={deleteModal}
          handleCloseClick={() => setDeleteModal(false)}
          validateDeleteGroup={handleDeleteGroup}
        />
      </div>
    </React.Fragment>
  );
};

export default ListGroups;
