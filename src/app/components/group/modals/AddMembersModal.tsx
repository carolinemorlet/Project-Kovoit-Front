import { useEffect } from 'react';
import { Button, Modal, ModalBody, Table } from 'reactstrap';
import { getChildren } from 'app/services/api/child';

interface props {
  setAvailableChildren: any;
  availableChildren: any;
  selectedChildren: any;
  isOpen: boolean;
  group: any;
  closeAddMembersModal: () => void;
  addChildren: (item) => void;
  setSelectedChildren: any;
  handleChangeSelectChild: (data) => void;
}

const AddMembersModal = ({
  setAvailableChildren,
  availableChildren,
  selectedChildren,
  group,
  isOpen,
  closeAddMembersModal,
  addChildren,
  handleChangeSelectChild,
}: props) => {
  // useEffect(() => {
  //   const loadKids = async () => {
  //     try {
  //       const response = await getChildren();
  //       const allChildren: any[] = response.datas || [];
  //       const childrenNotInGroup = allChildren.filter((child) =>
  //         group.kidId.some((groupChild) => groupChild._id !== child._id)
  //       );
  //       setAvailableChildren(childrenNotInGroup);
  //     } catch (error) {
  //       console.error(
  //         "Une erreur s'est produite lors du chargement des enfants",
  //         error
  //       );
  //     }
  //   };
  //   loadKids();
  // }, [group.kidId, setAvailableChildren]);

  return (
    <Modal isOpen={isOpen} toggle={closeAddMembersModal} centered={true}>
      <ModalBody>
        <div className="table-responsive">
          <Table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {availableChildren?.map((kid, index) => (
                <tr key={index}>
                  <td>{kid.firstname}</td>
                  <td>{kid.lastname}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleChangeSelectChild(kid._id);
                      }}
                      // checked={selectedChildren.includes(kid._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end">
            <Button
              onClick={() => addChildren(selectedChildren)}
              type="button"
              color="success"
              className="save-customer"
            >
              Valider
            </Button>
            <Button
              type="button"
              color="secondary"
              className="save-customer"
              onClick={closeAddMembersModal}
            >
              Annuler
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddMembersModal;
