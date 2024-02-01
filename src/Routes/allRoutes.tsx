import DashboardAdmin from 'app/pages/dashboardAdmin/Dashboard';

//Authentication pages
// import ConfirmMail from '../pages/AuthenticationInner/page-confirm-mail';
// import EmailVerification from '../pages/AuthenticationInner/auth-email-verification';
// import TwostepVerification from '../pages/AuthenticationInner/auth-two-step-verification';

// //Pages
// import PagesMaintenance from '../pages/Utility/pages-maintenance';
// import PagesComingsoon from '../pages/Utility/pages-comingsoon';
// import Pages404 from '../pages/Utility/pages-404';
// import Pages500 from '../pages/Utility/pages-500';

// // Auth
// import Logout from 'pages/Authentication/Logout';

import ResetPassword from 'app/components/auth/resetPassword';

import LoginUser from 'app/pages/auth/login/LoginUser';

import CreateEvent from 'app/pages/event/CreateEvent';
import EditGroup from 'app/pages/group/EditGroup';
import Association from 'app/pages/association/Association';
import SignUp from 'app/components/auth/signup';
import EditEvent from 'app/pages/event/EditEvent';
import Events from 'app/pages/event/Events';
import Child from 'app/pages/child/Child';
import Groups from 'app/pages/group/Groups';
import DashboardUser from 'app/pages/dashboardUser/Dashboard';

const authProtectedRoutes = [
  { path: '/dashboard', component: <DashboardAdmin /> },
  { path: '/dashboardUser', component: <DashboardUser /> },
  { path: '/association', component: <Association /> },
  { path: '/listChild', component: <Child /> },
  { path: '/group', component: <Groups /> },
  { path: '/edit-group/:id', component: <EditGroup /> },
  { path: '/listEvent', component: <Events /> },
  { path: '/create-event', component: <CreateEvent /> },
  { path: '/edit-event/:id', component: <EditEvent /> },

  // { path: '/logout', component: <Logout /> },
];

const publicRoutes = [
  { path: '/signup', component: <SignUp /> },
  { path: '/', component: <LoginUser /> },
  { path: '/forgot-password', component: <ResetPassword /> },

  //partie template
  // { path: '/logout', component: <Logout /> },
  // { path: '/pages-maintenance', component: <PagesMaintenance /> },
  // { path: '/pages-comingsoon', component: <PagesComingsoon /> },
  // { path: '/pages-404', component: <Pages404 /> },
  // { path: '/pages-500', component: <Pages500 /> },

  // // Authentication Inner
  // { path: '/page-confirm-mail', component: <ConfirmMail /> },
  // { path: '/auth-email-verification', component: <EmailVerification /> },
  // { path: '/auth-two-step-verification', component: <TwostepVerification /> },
];
export { authProtectedRoutes, publicRoutes };
