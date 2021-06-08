import React from 'react';
import ModelForm from 'components/model-form/ModelForm';
import { Redirect, useParams } from 'react-router';
import useModel from 'hooks/useModel';
import { tw } from 'twind';
import { updateModel } from 'api/models.api';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'state/selectors/users.selectors';
import WithLoading from 'components/with-loading/WithLoading';

const EditModelPage = () => {
  const { slug } = useParams();
  const model = useModel(slug);
  const loggedInUser = useSelector(selectCurrentUser);
  return (
    <WithLoading condition={model.user.username}>
      {loggedInUser?.username === model.user?.username ? (
        <div className="px-6 mx-20 md:mt-12">
          <h1 className={tw`text(center black xl) font-semibold`}>
            Editing model <em>{slug}</em>
          </h1>
          <ModelForm
            initialModel={model}
            onFormSubmit={(data) => updateModel(data, slug)}
          />
        </div>
      ) : (
        <Redirect to={'/'} />
      )}
    </WithLoading>
  );
};

export default EditModelPage;
