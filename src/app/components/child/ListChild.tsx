import React, { useEffect, useState } from 'react';
import { Table, Card, CardBody, Button, UncontrolledTooltip } from 'reactstrap';

import {
  getChildren,
  deleteChildById,
  createChild,
  updateChildById,
} from '../../services/api/child';
import CreateModal from './modals/CreateChildModal';
import UpdateModal from './modals/UpdateChildModal';
import DeleteModal from './modals/DeleteChildModal';
import { Link } from 'react-router-dom';
import { formatDateAndTime } from 'app/utils/FormattedDate';

const ListChild = () => {
  const [children, setChildren]: any = useState([]);
  const [child, setChild]: any = useState({});
  const [addModal, setAddModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const loadChildren = async (): Promise<any> => {
      const response = await getChildren();

      const formatted_datas = response?.datas.map((el: any) => {
        const birthdateFormat = el.birthdate
          ? el.birthdate
          : 'Date de naissance non disponible';
        const newFormatBirthdate = formatDateAndTime(birthdateFormat);

        return {
          ...el,
          birthdate: newFormatBirthdate,
          // email: el.userId.email,
        };
      });
      setChildren(formatted_datas);
    };
    loadChildren();
  }, []);

  const handleAddButtonClick = async () => {
    setAddModal(!addModal);
  };

  const handleUpdateButtonClick = async (item) => {
    setChild(item);
    setUpdateModal(!updateModal);
  };

  const handleDeleteButtonClick = async (item) => {
    setChild(item);
    setDeleteModal(!deleteModal);
  };

  const addChild = async (data: any) => {
    try {
      const response = await createChild(data);
      setChildren([...children, response.datas]);
    } catch (error) {
      console.error("Erreur lors de la création de l'enfant :", error);
    }
    setAddModal(!addModal);
  };

  const updateChild = async (item: any) => {
    try {
      const response = await updateChildById(item.id, item);
      if (response.status) {

        const updatedChildren = [...children];
        const updatedIndex = updatedChildren.findIndex(
          (el: any) => el.id === response.datas.id
        );

        if (updatedIndex !== -1) {
          // updatedChildren[updatedIndex] = response.datas;
          // setChildren(updatedChildren);
          updatedChildren.splice(updatedIndex, 1, response);
          setChildren(updatedChildren);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'enfant :", error);
    }
    setUpdateModal(!updateModal);
  };


  const deleteChild = async (item: any) => {
    try {
      const response = await deleteChildById(item._id);
      console.log(
        '🚀 ~ file: ListChild.tsx:91 ~ deleteChild ~ response:',
        response
      );
      if (response.status) {
        let deleteChild = children.filter((el: any) => el.id !== response);
        setChildren(deleteChild);
      }
    } catch (error) {}
    setDeleteModal(!deleteModal);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="text-center">Liste des adhérents</h2>

          <Card>
            <CardBody>
              <div className="d-sm-flex flex-wrap">
                <span className="text-sm-end ms-auto">
                  <Button
                    type="button"
                    className="btn btn-soft-success waves-effect waves-light"
                    onClick={() => {
                      handleAddButtonClick();
                    }}
                  >
                    <i className="mdi mdi-plus font-size-16 align-middle me-2" />
                    Créer une fiche enfant
                  </Button>
                </span>
              </div>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date de naissance</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.lastname}</td>
                        <td>{item.firstname}</td>
                        <td>{item.birthdate.date}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>

                        <td>
                          <Link
                            to="#"
                            className="text-success"
                            onClick={() => handleUpdateButtonClick(item)}
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
      </div>
      <CreateModal
        child={child}
        show={addModal}
        onCloseClick={() => setAddModal(false)}
        validateCreateForm={addChild}
      />
      <UpdateModal
        child={child}
        show={updateModal}
        onCloseClick={() => setUpdateModal(false)}
        validateUpdateForm={updateChild}
      />
      <DeleteModal
        child={child}
        show={deleteModal}
        onCloseClick={() => setDeleteModal(false)}
        validateDeleteChild={deleteChild}
      />
    </React.Fragment>
  );
};

export default ListChild;
