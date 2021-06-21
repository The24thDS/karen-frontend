import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  BsCollectionFill,
  TiFolderDelete,
  AiFillEdit,
  RiDeleteBin7Fill,
} from 'react-icons/all';

import ModelAddToCollectionModal from 'components/model/ModelAddToCollectionModal';
import ModelDeleteModal from 'components/model/ModelDeleteModal';
import ModelRemoveFromCollectionModal from 'components/model/ModelRemoveFromCollectionModal';

import { selectCurrentUser } from 'state/selectors/users.selectors';
import { tw } from 'twind';
import WithTooltip from 'components/with-tooltip/WithTooltip';

const ModelActionButtons = ({ user, slug }) => {
  const loggedInUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [collectionAddModalOpened, setCollectionAddModalOpened] =
    useState(false);
  const [collectionRemoveModalOpened, setCollectionRemoveModalOpened] =
    useState(false);

  return (
    <div className="col-span-3 flex items-center text-sm">
      {loggedInUser !== null && (
        <>
          <WithTooltip text="Add to collection">
            <button
              className={tw('bg-blue-200 text-white p-1 rounded mr-2 text-xl')}
              onClick={() => setCollectionAddModalOpened(true)}
            >
              <BsCollectionFill className={tw('text-black')} />
            </button>
          </WithTooltip>
          <WithTooltip text="Remove from collection">
            <button
              className={tw('bg-red-200 text-black p-1 rounded mr-2 text-xl')}
              onClick={() => setCollectionRemoveModalOpened(true)}
            >
              <TiFolderDelete className={tw('text-red-600')} />
            </button>
          </WithTooltip>
          {collectionAddModalOpened && (
            <ModelAddToCollectionModal
              onClose={() => setCollectionAddModalOpened(false)}
              slug={slug}
            />
          )}
          {collectionRemoveModalOpened && (
            <ModelRemoveFromCollectionModal
              onClose={() => setCollectionRemoveModalOpened(false)}
              slug={slug}
            />
          )}
        </>
      )}
      {loggedInUser?.username === user.username && (
        <>
          <WithTooltip text="Edit model">
            <Link
              className={tw(
                'bg-blue-500 text-white p-1 rounded mr-2 text-xl block'
              )}
              to={`${location.pathname}/edit`}
            >
              <AiFillEdit />
            </Link>
          </WithTooltip>
          <WithTooltip text="Delete model">
            <button
              className={tw('bg-red-500 text-white p-1 rounded text-xl')}
              onClick={() => setDeleteModalOpened(true)}
            >
              <RiDeleteBin7Fill />
            </button>
          </WithTooltip>
          {deleteModalOpened && (
            <ModelDeleteModal
              onClose={() => setDeleteModalOpened(false)}
              slug={slug}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModelActionButtons;
