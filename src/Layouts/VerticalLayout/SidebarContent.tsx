import React, { useEffect, useRef, useCallback } from 'react';
//Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';

import './sidebarContent.css';

import { Link, useLocation } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';
import withRouter from '../../Components/Common/withRouter';

const SidebarContent = (props: any) => {
  // const location = useLocation();
  const ref = useRef<any>();
  // const shouldShowSidebar = location.pathname !== '/dashboardUser';
  const activateParentDropdown = useCallback((item: any) => {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            //www.youtube.com/feed/subscriptions
            https: parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.remove('mm-show');
        }

        parent.classList.remove('mm-active');
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove('mm-show');

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('mm-active'); // li
            parent3.childNodes[0].classList.remove('mm-active');

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove('mm-show'); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('mm-show'); // li
                parent5.childNodes[0].classList.remove('mm-active'); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = process.env.PUBLIC_URL + props.router.location.pathname;
    let matchingMenuItem = null;
    const ul: any = document.getElementById('side-menu');
    const items = ul.getElementsByTagName('a');
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.router.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu('#side-menu');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item: any) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    window.location.href = '/';
  };

  return (
    <React.Fragment>
      {/* {shouldShowSidebar && ( */}
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>Dashoard</span>
              </Link>
              <ul>
                <li>
                  <Link to="/dashboard">Page d'accueil Admin</Link>
                </li>
                <li>
                  <Link to="/dashboardUser">Page d'accueil Utilisateur</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/association">
                <i className="bx bx-store"></i>
                <span>Association</span>
              </Link>
            </li>
            <li>
              <Link to="/listChild">
                <i className="bx bx-store"></i>
                <span>Enfants</span>
              </Link>
            </li>
            <li>
              <Link to="/listEvent">
                <i className="bx bx-store"></i>
                <span>Evenements</span>
              </Link>
            </li>
            <li>
              <Link to="/group">
                <i className="bx bx-store"></i>
                <span>Groupe</span>
              </Link>
            </li>
            <div className="logout-wrapper">
              <li>
                <Link to="#" className="logout-link" onClick={logout}>
                  <i className="bx bx-store"></i>
                  <span>Se déconnecter</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};
export default withRouter(withTranslation()(SidebarContent));
