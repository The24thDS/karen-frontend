import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tw } from 'twind';

import { fetchModels } from 'state/actions/models.actions';
import {
  selectModels,
  selectModelsLoading,
} from 'state/selectors/models.selectors';

import ModelsGrid from 'components/models-grid/ModelsGrid';
import WithLoading from 'components/with-loading/WithLoading';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

const ModelListPage = () => {
  const dispatch = useDispatch();
  const models = useSelector(selectModels);
  const loading = useSelector(selectModelsLoading);
  const [page, setPage] = useState(0);

  const fetchMoreModels = () => {
    dispatch(fetchModels({ page }));
    setPage((page) => page + 1);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreModels);

  useEffect(() => {
    setIsFetching(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    fetchMoreModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={tw(`mt-10 mx-20`)}>
      <ModelsGrid models={models} />
      <WithLoading condition={!isFetching}> </WithLoading>
    </section>
  );
};

export default ModelListPage;
