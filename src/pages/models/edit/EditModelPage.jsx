import React from 'react';
import ModelForm from 'components/model-form/ModelForm';
import { Redirect, useParams } from 'react-router';
import useModel from 'hooks/useModel';
import { tw } from 'twind';
import { updateModel } from 'api/models.api';
import { useSelector } from 'react-redux';
import { selectCurrentUserData } from 'state/selectors/users.selectors';

const EditModelPage = () => {
  const { slug } = useParams();
  const model = useModel(slug);
  const loggedInUser = useSelector(selectCurrentUserData);
  return loggedInUser?.username === model.user?.username ? (
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
  );
};

export default EditModelPage;
