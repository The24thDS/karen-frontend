import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { tw } from 'twind';

import { setModels, setModelsPage } from 'state/actions/models.actions';
import {
  selectIndexModels,
  selectIndexModelsPage,
} from 'state/selectors/models.selectors';
import { selectCurrentUser } from 'state/selectors/users.selectors';
import { fetchModels, fetchUserModels } from 'api/models.api';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

import ModelsGrid from 'components/models-grid/ModelsGrid';
import WithLoading from 'components/with-loading/WithLoading';

const ModelListPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  // USE STATE HOOKS
  const [userModelsData, setUserModelsData] = useState({ items: [], page: 0 });

  // USE SELECTOR HOOKS
  const currentUser = useSelector(selectCurrentUser);
  const models = useSelector(selectIndexModels);
  const page = useSelector(selectIndexModelsPage);

  // FUNCTIONS
  const fetchMoreModels = async () => {
    if (isUserPage) {
      const response = await fetchUserModels({
        page: userModelsData.page,
        username,
      });
      if (response) {
        setUserModelsData({
          items: [...userModelsData.items, ...response],
          page: userModelsData.page + 1,
        });
      }
    } else {
      const response = await fetchModels({ page });
      if (response) {
        dispatch(setModels(response));
        dispatch(setModelsPage(page + 1));
      }
    }
    setIsFetching(false);
  };

  // USE EFFECT HOOKS
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreModels);

  useEffect(() => {
    if (!models.length || isUserPage) {
      fetchMoreModels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USE MEMO HOOKS
  const shouldHideLoading = useMemo(
    () => !isFetching && (models.length !== 0 || page !== 0),
    [isFetching, models, page]
  );
  const isUserPage = useMemo(() => username !== undefined, [username]);
  const isMyModelsPage = useMemo(
    () => username === currentUser?.username,
    [username, currentUser]
  );
  const topMessage = useMemo(
    () =>
      isUserPage
        ? isMyModelsPage
          ? 'Your models'
          : `${username}'s models`
        : '',
    [isMyModelsPage, isUserPage, username]
  );

  return (
    <section className={tw(`mt-10 mx-20`)}>
      <h1 className={tw(`text-xl font-semibold mb-2`)}>{topMessage}</h1>
      <ModelsGrid models={isUserPage ? userModelsData.items : models} />
      <WithLoading condition={shouldHideLoading}> </WithLoading>
    </section>
  );
};

export default ModelListPage;
