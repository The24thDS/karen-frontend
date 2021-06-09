import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setSearchedModels,
  setSearchedModelsPage,
} from 'state/actions/models.actions';
import {
  selectSearchModels,
  selectSearchModelsPage,
  selectSearchModelsTerm,
} from 'state/selectors/models.selectors';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { searchModels } from 'api/models.api';

import ModelsGrid from 'components/models-grid/ModelsGrid';
import WithLoading from 'components/with-loading/WithLoading';

const SearchResultsPage = () => {
  const models = useSelector(selectSearchModels);
  const term = useSelector(selectSearchModelsTerm);
  const page = useSelector(selectSearchModelsPage);
  const dispatch = useDispatch();

  const fetchMoreModels = async () => {
    const response = await searchModels({ q: term, page });
    if (response) {
      dispatch(setSearchedModels(response));
      dispatch(setSearchedModelsPage(page + 1));
    }
    setIsFetching(false);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreModels);

  const shouldShowModels = useMemo(
    () => !isFetching && (models.length !== 0 || page !== 0),
    [isFetching, models, page]
  );

  return (
    <div className="px-20 md:mt-12">
      <h1 className="text-xl font-semibold">
        Search results for <span className="italic font-bold">{term}</span>
      </h1>
      <ModelsGrid models={models} />
      <WithLoading condition={shouldShowModels}> </WithLoading>
    </div>
  );
};

export default SearchResultsPage;
