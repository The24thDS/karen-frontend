import { useMemo, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tw } from 'twind';

import {
  clearSearchedModels,
  setSearchedModels,
  setSearchedModelsPage,
} from 'state/actions/models.actions';
import {
  selectSearchModels,
  selectSearchModelsPage,
  selectSearchModelsTerm,
} from 'state/selectors/models.selectors';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { searchModels, getAvailableModelFormats } from 'api/models.api';

import ModelsGrid from 'components/models-grid/ModelsGrid';
import WithLoading from 'components/with-loading/WithLoading';
import Select from 'components/form/inputs/Select';
import { useForm } from 'react-hook-form';

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const lastFormData = useRef({});

  // USE SELECTOR HOOKS
  const models = useSelector(selectSearchModels);
  const term = useSelector(selectSearchModelsTerm);
  const page = useSelector(selectSearchModelsPage);

  // USE STATE HOOKS
  const [formats, setFormats] = useState([]);

  // FUNCTIONS
  const fetchMoreModels = async (filterData = {}) => {
    const params = {
      q: term,
      page,
      ...lastFormData,
      ...filterData,
    };
    const response = await searchModels(params);
    if (response) {
      dispatch(setSearchedModels(response));
      dispatch(setSearchedModelsPage(params.page + 1));
    }
    setIsFetching(false);
  };

  const filteredSearch = (data) => {
    if (data.formats === 'NO') {
      delete data.formats;
    }
    if (data.triangleCountOption === 'NO') {
      delete data.triangleCountOption;
    }
    lastFormData.current = data;
    dispatch(clearSearchedModels());
    dispatch(setSearchedModelsPage(0));
    fetchMoreModels({ ...data, page: 0 });
  };

  // USE EFFECT HOOKS
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreModels);

  useEffect(() => {
    let mounted = true;
    (async function getFormats() {
      const response = await getAvailableModelFormats();
      if (response && mounted) {
        setFormats(response.sort());
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // USE MEMO HOOKS
  const shouldShowModels = useMemo(
    () => !isFetching && (models.length !== 0 || page !== 0),
    [isFetching, models, page]
  );

  return (
    <div className={tw(`px-20 md:mt-12`)}>
      <div className={tw(`flex justify-between mb-2`)}>
        <h1 className={tw(`text-xl font-semibold`)}>
          Search results for{' '}
          <span className={tw(`italic font-bold`)}>{term}</span>
        </h1>
        <form
          className={tw(`flex items-center`)}
          onSubmit={handleSubmit(filteredSearch)}
        >
          <Select
            name="formats"
            options={[{ name: 'Formats', value: 'NO' }, ...formats]}
            selectClassNames={tw(`text-base px-1 py-2`)}
            register={register}
          />
          <Select
            name="triangleCountOption"
            options={[
              { name: 'Triangle count', value: 'NO' },
              { name: 'up to 5k', value: '0' },
              { name: 'up to 10k', value: '1' },
              { name: 'up to 15k', value: '2' },
              { name: 'up to 20k', value: '3' },
            ]}
            selectClassNames={tw(`text-base px-1 py-2`)}
            register={register}
          />
          <button
            className={tw(
              `ml-3 px-2 py-1 
              border(& blue-600) rounded text-blue-600 shadow 
              disabled:(text-gray-500 cursor-default shadow-none) 
              hover:(text-white bg-blue-600 shadow-none)`
            )}
            type="submit"
          >
            Apply filters
          </button>
        </form>
      </div>
      <ModelsGrid models={models} />
      <WithLoading condition={shouldShowModels}> </WithLoading>
    </div>
  );
};

export default SearchResultsPage;
