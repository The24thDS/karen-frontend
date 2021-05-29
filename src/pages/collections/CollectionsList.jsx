import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { tw } from 'twind';

import { selectCurrentUserData } from 'state/selectors/users.selectors';

import CollectionsGrid from 'components/collections-grid/CollectionsGrid';
import WithLoading from 'components/with-loading/WithLoading';
import Modal from 'components/modal/Modal';
import CollectionForm from 'components/collection-form/CollectionForm';

const CollectionsList = () => {
  const { username } = useParams();
  const currentUser = useSelector(selectCurrentUserData);
  const [modalOpened, setModalOpened] = useState(false);
  const isMyCollectionsPage = useMemo(
    () => username === currentUser?.username,
    [username, currentUser]
  );
  // TODO: fetch user collections
  return (
    <section className={tw(`px-20 md:mt-12 grid grid-cols-2 gap-y-4`)}>
      <h1 className={tw(`text-xl font-semibold`)}>
        {isMyCollectionsPage ? 'Your' : username + "'s"} collections
      </h1>
      <div className={tw(`justify-self-end`)}>
        {isMyCollectionsPage && (
          <button
            className={tw(`p-2 bg-green-400 rounded shadow hover:shadow-none`)}
            onClick={() => setModalOpened(true)}
          >
            Create new collection
          </button>
        )}
      </div>
      <WithLoading condition={true} addClassNames="col-span-2">
        <CollectionsGrid collections={[]} />
      </WithLoading>
      {modalOpened && (
        <Modal
          onClose={() => setModalOpened(false)}
          addWindowClassNames={tw(`md:w-96`)}
        >
          <h2 className={tw(`text-center text-lg font-semibold`)}>
            Create a new collection
          </h2>
          <CollectionForm />
        </Modal>
      )}
    </section>
  );
};

export default CollectionsList;
