import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from "reactstrap";

const GroupDetail = (props: any) => {
    const { isOpen, toggle, handleCloseClick, detail } = props;
    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex={-1}
            toggle={toggle}
        >
            <div className="modal-content">
                <ModalHeader>Order Details</ModalHeader>
                <ModalBody>
                    <p className="mb-2">
                        Group id: <span className="text-primary">#{detail.id}</span>
                    </p>
                    <p className="mb-4">
                        Name: <span className="text-primary">{detail.name} </span>
                    </p>

                    <div className="table-responsive">
                        <Table className="table align-middle table-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">Kid</th>
                                    <th scope="col">Phone </th>
                                    <th scope="col">Birthday</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detail.kids?.map((kid, i) => (
                                    <tr>
                                        <td>
                                            <div>
                                                {kid.lastname} {kid.firstname}
                                            </div>
                                        </td>
                                        <td>
                                            <div>{kid.phone}</div>
                                        </td>
                                        <td>
                                            <div>{kid.birthday}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="secondary" onClick={handleCloseClick}>
                        Fermer
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    );
};

export default GroupDetail;
