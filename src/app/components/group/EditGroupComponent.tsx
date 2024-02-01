import {
  Card,
  Container,
  CardBody,
  CardTitle,
  Form,
  Table,
  Button,
  FormFeedback,
  Input,
  Label,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { getGroupById, updateGroup } from 'app/services/api/groupsService';
import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddMembersModal from '../../components/group/modals/AddMembersModal';
import { getChildById, getChildren } from 'app/services/api/child';
import DeleteChildIntoGroupModal from './modals/DeleteChildIntoGroupModal';

const EditGroupComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup]: any = useState({});
  const [addMembers, setAddMembers]: any = useState(false);
  const [selectedChildren, setSelectedChildren] = useState<Array<string>>([]);

  const [availableChildren, setAvailableChildren] = useState<any[]>([]);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteKid, setDeleteKid] = useState({});

  useEffect(() => {
    const loadGroupById = async () => {
      try {
        const response = await getGroupById(id);
        setGroup(response.datas || {});
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    loadGroupById();
  }, [id]);

  const handleAddMembersClick = async () => {
    try {
      const allChildren = await getChildren();
      if (Array.isArray(allChildren.datas)) {
        const childrenNotInGroup = allChildren.datas.filter(
          (child) =>
            !group.kidId.some((groupChild) => groupChild._id === child._id)
        );
        setAvailableChildren(childrenNotInGroup);
        // setSelectedChildren([]);
      } else {
        console.error("La valeur de 'allChildren.datas' n'est pas un tableau.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
    setAddMembers(!addMembers);
  };

  const closeAddMembersModal = () => {
    setAddMembers(!addMembers);
  };

  const handleChangeSelectChild = (kidId: string) => {
    if (!selectedChildren.includes(kidId)) {
      setSelectedChildren([...selectedChildren, kidId]);
    }
  };

  const addChildrenToGroup = async () => {
    try {
      const childrenDetails = await Promise.all(
        selectedChildren.map(async (childId) => {
          const response = await getChildById(childId);
          return response?.datas;
        })
      );
      const validChildren = childrenDetails.filter((child) => child);
      setGroup({
        ...group,
        kidId: [...group.kidId, ...validChildren],
      });
    } catch (error) {
      console.error(error);
    }
    closeAddMembersModal();
  };

  const handleUpdateGroup = async (item) => {
    try {
      const response = await updateGroup(item.id, item);
      if (response.status) {
        setGroup(...group, ...response.datas);
      } else {
        console.error('Erreur lors de la mise à jour du groupe', response);
      }
    } catch (error) {
      console.error();
    }
  };

  const handleDeleteKidButtonClick = (item) => {
    setDeleteKid(item);
    setDeleteModal(!deleteModal);
  };

  const handleDeleteChildIntoGroup = (item) => {
    if (group && group.kidId) {
      const updatedChildrenList = group.kidId.filter(
        (child) => child._id !== item._id
      );

      setSelectedChildren(updatedChildrenList);

      console.log(
        '🚀 ~ handleDeleteChildIntoGroup ~ updatedChildrenList:',
        updatedChildrenList
      );
      setAvailableChildren((prevAvailableChildren) => [
        ...prevAvailableChildren,
        item._id,
      ]);

      setDeleteModal(!deleteModal);
    } else {
      console.error('Group, group.kidId, or item is undefined');
    }
  };


  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (group && group.name) || '',
      color: (group && group.color) || '#556ee6',
      description: (group && group.description) || '',
      kidId: (group && group.kidId) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().lowercase().required('Ce champ est requis'),
      color: Yup.string(),
      description: Yup.string().required('Ce champ est requis'),
      kidId: Yup.array(),
    }),
    onSubmit: (values: any) => {
      const updateGroup = {
        id: group._id,
        name: values.name,
        color: values.color,
        description: values.description,
        kidId: group.kidId,
      };
      handleUpdateGroup(updateGroup);
      validation.resetForm();
      navigate('/group');
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Card>
            <CardBody>
              <CardTitle className="h5">Modification de groupe</CardTitle>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                }}
              >
                <Row>
                  <Col className="col-9">
                    <div className="form-floating mb-3">
                      <Input
                        type="text"
                        name="name"
                        className="form-control"
                        id="floatingNameInput"
                        placeholder="Nom"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ''}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      <Label htmlFor="floatingNameInput">Nom</Label>
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-floating mb-3">
                      <Input
                        type="color"
                        name="color"
                        className="form-control"
                        id="floatingColorInput"
                        placeholder="Couleur"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.color || '#556ee6'}
                        invalid={
                          validation.touched.color && validation.errors.color
                            ? true
                            : false
                        }
                      />
                      <Label htmlFor="floatingColorInput">Couleur</Label>
                      {validation.touched.color && validation.errors.color ? (
                        <FormFeedback type="invalid">
                          {validation.errors.color}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="form-floating mb-3">
                  <Input
                    type="textarea"
                    name="description"
                    className="form-control"
                    id="floatingDescriptionInput"
                    placeholder="Description"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ''}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  <Label htmlFor="floatingNameInput">Description</Label>
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>

                <div>
                  <Button
                    type="button"
                    className="btn btn-primary w-md"
                    onClick={() => handleAddMembersClick()}
                  >
                    Ajouter des enfants
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group &&
                        group.kidId?.map((kid, index) => (
                          <tr key={index}>
                            <td>{kid.lastname}</td>
                            <td>{kid.firstname}</td>
                            <td>
                              <Link
                                to="#"
                                className="text-success"
                                onClick={() => handleDeleteKidButtonClick(kid)}
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

                <div className="d-md-flex justify-content-md-end">
                  <button type="submit" className="btn btn-primary w-md">
                    Valider
                  </button>
                  <Link to="/group">
                    <button type="button" className="btn btn-secondary w-md">
                      Retour
                    </button>
                  </Link>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
        <AddMembersModal
          group={group}
          setAvailableChildren={setAvailableChildren}
          availableChildren={availableChildren}
          selectedChildren={selectedChildren}
          isOpen={addMembers}
          closeAddMembersModal={closeAddMembersModal}
          addChildren={addChildrenToGroup}
          setSelectedChildren={setSelectedChildren}
          handleChangeSelectChild={handleChangeSelectChild}
        />

        <DeleteChildIntoGroupModal
          handleDeleteChildIntoGroup={handleDeleteChildIntoGroup}
          onCloseClick={() => setDeleteModal(false)}
          show={deleteModal}
          deleteKid={deleteKid}
        />
      </div>
    </React.Fragment>
  );
};

export default EditGroupComponent;


