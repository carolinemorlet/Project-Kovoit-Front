import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, ModalBody, ModalHeader } from 'reactstrap';

const LoginModal = (props: any) => {
  const { isOpen, associationsList, sendAsso } = props;
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [asso, setAsso] = useState('');

  useEffect(() => {
    const dataFromLocalStorage: any = localStorage.getItem('authUser');
    setData(dataFromLocalStorage);
    console.log('data', dataFromLocalStorage);
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    // route vers /dashboardUser
    // navigate("/dashboardUser");
    sendAsso(asso);
  }

  const handleChangeAsso = (value) => {
    setAsso(value);
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader tag="h4"> choix de l'association</ModalHeader>
      <ModalBody>
        <Form onSubmit={(evt) => handleSubmit(evt)}>
          <label htmlFor="floatingSelectGrid">
            Veuillez choisir votre association
          </label>
          <div className="">
            <select
              className="form-select"
              onChange={(e: any) => {
                handleChangeAsso(e.target.value);
              }}
            >
              <option value="null">Selectionnez une association</option>
              {associationsList.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex-end">
            <button className="btn btn-danger  mx-1">Annuler</button>
            <button className="btn btn-primary " type="submit">
              Valider
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;
