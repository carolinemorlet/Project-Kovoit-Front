import { useState } from 'react';
import { useLocalStorage } from 'app/hooks/useLocalStorage';
import withRouter from 'Components/Common/withRouter';

// Redux
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  Label,
  FormFeedback,
} from 'reactstrap';
import { login } from '../../services/api/auth';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import logo from '../../assets/images/kovoit.png';

import LoginModal from './loginModal';
import { getAssociationByUserId } from 'app/services/api/association';

const LoginForm = (props: any, history: any) => {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [token, setToken]: any = useState('');
  const [showLoginModal, setShowLoginModal]: any = useState(false);

  const [storedToken, setStoredToken] = useLocalStorage('token', []);
  const [storedUser, setStoredUser] = useLocalStorage('authUser', []);
  // const [storedUserAsso, setStoredUserAsso] = useLocalStorage('userAsso', []);
  const [associationsList, setAssociationsList] = useState([]);


  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().required('Veuillez entrer votre email'),
      password: Yup.string().required('Veuillez entrer votre mot de passe'),
    }),

    onSubmit: async (values: any) => {
      const response = await login(values);
      if (response.status) {
        setStoredToken(response.datas.data.accessToken);
        setStoredUser(response.datas.data.user);
        loadAssociation(response.datas.data.user._id);
        setShowLoginModal(true);
      }
    },
  });

  const loadAssociation = async (id: string) => {
    const response = await getAssociationByUserId(id);
    setAssociationsList(response?.datas);
  };

  const handleSubmitAsso = (assoId) => {
    // setStoredUserAsso(assoId);
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Bienvenue sur Kovoit</h5>
                        <p>Connecter vous pour accéder à l'application</p>
                      </div>
                    </Col>
                    <Col className="col-5 h50">
                      <img src={logo} alt="" className="img-fluid h-00" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        validation.handleSubmit();

                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ''}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Mot de passe</Label>
                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="password"
                            value={validation.values.password || ''}
                            type={show ? 'text' : 'password'}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          <button
                            onClick={() => setShow(!show)}
                            className="btn btn-light "
                            type="button"
                            id="password-addon"
                          >
                            <i className="mdi mdi-eye-outline"></i>
                          </button>
                        </div>
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Se connecter
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" /> Mot de passe
                          oublié ?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Pas de compte en tant que parent ? Veuillez contacter
                  l'association
                </p>

                <p>
                  Vous souhaitez créer un compte pour créer une association
                  <div>
                    <Link to="/signup" className="fw-medium text-primary">
                      Créer mon compte
                    </Link>
                  </div>
                </p>
                <p>
                  © {new Date().getFullYear()} Développé par la KovoiTeam ©
                  Caroline, Alexis, Hugo
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <LoginModal
          isOpen={showLoginModal}
          associationsList={associationsList}
          sendAsso={handleSubmitAsso}
        />
      </div>
    </>
  );
};

export default withRouter(LoginForm);
