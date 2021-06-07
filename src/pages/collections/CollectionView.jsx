import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { tw } from 'twind';

import { selectCurrentUserData } from 'state/selectors/users.selectors';
import Modal from 'components/modal/Modal';
import CollectionForm from 'components/collection-form/CollectionForm';
import ModelsGrid from 'components/models-grid/ModelsGrid';
import WithLoading from 'components/with-loading/WithLoading';
import useCollectionWithModels from 'hooks/useCollectionsWithModels';
import CollectionDeleteModal from 'pages/collections/CollectionDeleteModal';

const CollectionView = () => {
  const { slug } = useParams();

  const currentUser = useSelector(selectCurrentUserData);

  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const collection = useCollectionWithModels(slug, trigger);

  const isMyCollection = useMemo(
    () => collection?.user?.username === currentUser?.username,
    [collection, currentUser]
  );
  const editFormValues = useMemo(
    () =>
      collection
        ? {
            name: collection.name,
            description: collection.description,
            visibility: collection.private ? 'private' : 'public',
          }
        : undefined,
    [collection]
  );

  return (
    <section className={tw(`px-20 md:mt-12`)}>
      <div className={tw(`grid grid-cols-2 gap-y-4 mb-4`)}>
        <h1 className={tw(`flex items-center text-xl font-semibold`)}>
          {collection?.name}
          {collection?.private && (
            <>
              {' '}
              (<RiGitRepositoryPrivateFill className={tw(`text-sm`)} /> Private)
            </>
          )}
        </h1>
        <div className={tw(`justify-self-end`)}>
          {isMyCollection && (
            <>
              <button
                className={tw(
                  `p-2 bg-blue-400 rounded shadow hover:shadow-none`
                )}
                onClick={() => setEditModalOpened(true)}
              >
                Edit collection
              </button>
              <button
                className={tw(
                  `p-2 bg-red-400 rounded shadow hover:shadow-none ml-2`
                )}
                onClick={() => setDeleteModalOpened(true)}
              >
                Delete collection
              </button>
            </>
          )}
        </div>
        <p>{collection?.description}</p>
      </div>
      <WithLoading condition={collection !== null}>
        <ModelsGrid models={collection?.models ?? []} />
      </WithLoading>
      {editModalOpened && (
        <Modal
          onClose={() => setEditModalOpened(false)}
          addWindowClassNames={tw(`md:w-96`)}
        >
          <h2 className={tw(`text-center text-lg font-semibold`)}>
            Edit this collection
          </h2>
          <CollectionForm
            slug={collection?.slug}
            initialValues={editFormValues}
            onClose={() => setEditModalOpened(false)}
            onSuccess={() => setTrigger(trigger + 1)}
          />
        </Modal>
      )}
      {deleteModalOpened && (
        <CollectionDeleteModal
          slug={slug}
          onClose={() => setDeleteModalOpened(false)}
        />
      )}
    </section>
  );
};

export default CollectionView;
