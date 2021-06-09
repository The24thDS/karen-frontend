import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tw } from 'twind';

import {
  selectIndexModels,
  selectIndexModelsPage,
} from 'state/selectors/models.selectors';

import ModelsGrid from 'components/models-grid/ModelsGrid';
import WithLoading from 'components/with-loading/WithLoading';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { fetchModels } from 'api/models.api';
import { setModels, setModelsPage } from 'state/actions/models.actions';

const ModelListPage = () => {
  const dispatch = useDispatch();

  const models = useSelector(selectIndexModels);
  const page = useSelector(selectIndexModelsPage);

  const fetchMoreModels = async () => {
    const response = await fetchModels({ page });
    if (response) {
      dispatch(setModels(response));
      dispatch(setModelsPage(page + 1));
    }
    setIsFetching(false);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreModels);

  useEffect(() => {
    if (!models.length) {
      fetchMoreModels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldHideLoading = useMemo(
    () => !isFetching && (models.length !== 0 || page !== 0),
    [isFetching, models, page]
  );

  return (
    <section className={tw(`mt-10 mx-20`)}>
      <ModelsGrid models={models} />
      <WithLoading condition={shouldHideLoading}> </WithLoading>
    </section>
  );
};

export default ModelListPage;
