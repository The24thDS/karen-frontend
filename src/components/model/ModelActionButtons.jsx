import ModelDeleteModal from 'components/model/ModelDeleteModal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectCurrentUserData } from 'state/selectors/users.selectors';
import { tw } from 'twind';

const ModelActionButtons = ({ user, slug }) => {
  const loggedInUser = useSelector(selectCurrentUserData);
  const location = useLocation();
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="col-span-2 flex items-center">
      {loggedInUser?.username === user.username && (
        <>
          <Link
            className={tw('bg-blue-500 text-white p-2 rounded mr-2')}
            to={`${location.pathname}/edit`}
          >
            Edit Model
          </Link>
          <button
            className={tw('bg-red-500 text-white p-2 rounded')}
            onClick={() => setModalOpened(true)}
          >
            Delete Model
          </button>
          {modalOpened && (
            <ModelDeleteModal
              onClose={() => setModalOpened(false)}
              slug={slug}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModelActionButtons;
