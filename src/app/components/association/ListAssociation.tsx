import React, { useEffect, useState } from 'react';
import { Table, Card, CardBody, Button, UncontrolledTooltip } from 'reactstrap';

import {
  getAllAssociation,
  createAssociation,
  updateAssociationById,
  deleteAssociationById,
} from '../../services/api/association';
import CreateAssoModal from './modals/createAssoModal';
import UpdateAssoModal from './modals/UpdateAssoModal';
import DeleteAssoModal from './modals/DeleteAssoModal';
import { Link } from 'react-router-dom';
import { formatAddress } from 'app/utils/FormattedAddress';

const ListAssociation = () => {
  document.title = 'Application de covoiturage';

  const [associations, setAssociations]: any = useState([]);
  const [association, setAssociation]: any = useState({});
  const [addModal, setAddModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const loadAssociation = async (): Promise<any> => {
      const response = await getAllAssociation();
      const formatted_datas = response?.datas.map((el: any) => {
        const addressAsso = el.address ? el.address : 'Adresse non disponible';
        const newFormatAddress = formatAddress(addressAsso);

        return {
          ...el,
          addressAsso: newFormatAddress,
        };
      });
      setAssociations(formatted_datas);
    };
    loadAssociation();
  }, []);

  const handleAddButtonClick = async () => {
    setAddModal(!addModal);
  };

  const handleUpdateButtonClick = async (item) => {
    setAssociation(item);
    setUpdateModal(!updateModal);
  };

  const handleDeleteButtonClick = async (item) => {
    setAssociation(item);
    setDeleteModal(!deleteModal);
  };

  const addAsso = async (data: any) => {
    try {
      const response = await createAssociation(data);
      setAssociations([...associations, response.datas]);
    } catch (error) {
      console.error(error);
    }
    setAddModal(!addModal);
  };

  const updateAsso = async (item: any) => {
    console.log('coucou creation de groupe')
    try {
      const response = await updateAssociationById(item.id, item);

      if (response.status) {
        const updatedAssociation = [...associations];
        const updatedIndex = updatedAssociation.findIndex(
          (el: any) => el.id === response.datas.id
        );

        if (updatedIndex !== -1) {
          updatedAssociation.splice(updatedIndex, 1, response);
          setAssociations(updatedAssociation);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setUpdateModal(!updateModal);
  };

  const deleteAsso = async (item: any) => {
    try {
      const response = await deleteAssociationById(item._id);
      if (response.status) {
        let deleteAssociation = associations.filter(
          (el: any) => el.id !== response
        );
        setAssociations(deleteAssociation);
      }
    } catch (error) {
      console.error(error);
    }
    setDeleteModal(!deleteModal);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="text-center">Liste de mes associations</h2>
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
                    Créer une nouvelle association
                  </Button>
                </span>
              </div>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Nom de l'association</th>
                      <th>Adresse</th>
                      <th>Téléphone</th>
                      <th>Site internet</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {associations?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.addressAsso}</td>
                        <td>{item.phone}</td>
                        <td>{item.website}</td>

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
      <CreateAssoModal
        association={association}
        show={addModal}
        onCloseClick={() => setAddModal(false)}
        validateCreateAsso={addAsso}
      />
      <UpdateAssoModal
        show={updateModal}
        onCloseClick={() => setUpdateModal(false)}
        association={association}
        validateUpdateAsso={updateAsso}
      />

      <DeleteAssoModal
        association={association}
        show={deleteModal}
        onCloseClick={() => setDeleteModal(false)}
        validateDeleteAsso={deleteAsso}
      />
    </React.Fragment>
  );
};

export default ListAssociation;
