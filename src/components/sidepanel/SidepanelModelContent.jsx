import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSelectedModel } from 'state/selectors/models.selectors';
import { useModelRecommendations } from 'components/sidepanel/custom-hooks';
import { getImagePath } from 'utils/general';
import ModelsGrid from 'components/models-grid/ModelsGrid';
import { ModelItemSmall } from 'components/model-item/ModelItem';
import { tw, css } from 'twind/css';

const container = css({
  maxHeight: 'calc(100vh - 96px)',
});

const SidepanelModelContent = () => {
  const selectedModel = useSelector(getSelectedModel);

  const recommendedModels = useModelRecommendations(selectedModel?.slug);

  return (
    <div className={tw(`overflow-y-auto pr-6`, container)}>
      <Link to={`/models/${selectedModel.slug}`} className={tw(`row-span-1`)}>
        <img
          className="w-full m-auto"
          src={getImagePath(
            selectedModel?.slug,
            selectedModel?.user?.username,
            selectedModel?.image
          )}
          alt=""
        />
        <h1 className={tw(`text-2xl py-4 mb-2 border-b text-center`)}>
          {selectedModel?.name}
        </h1>
      </Link>
      <p className={tw(`pb-1`)}>Similar models</p>
      <ModelsGrid models={recommendedModels} cols={3} item={ModelItemSmall} />
    </div>
  );
};

export default SidepanelModelContent;
