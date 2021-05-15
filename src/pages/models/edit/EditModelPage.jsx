import React from 'react';
import ModelForm from 'components/model-form/ModelForm';
import { useParams } from 'react-router';
import { useModel } from 'components/model/custom-hooks';
import { tw } from 'twind';
import { updateModel } from 'api/models.api';

const EditModelPage = () => {
  const { id } = useParams();
  const model = useModel(id);
  return (
    <div className="mx-20 px-6 md:mt-12">
      <h1 className={tw`text(center black xl) font-semibold`}>
        Editing model <em>{id}</em>
      </h1>
      <ModelForm initialModel={model} onFormSubmit={updateModel(id)} />
    </div>
  );
};

export default EditModelPage;
