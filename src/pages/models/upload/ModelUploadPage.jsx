import React from 'react';
import { tw } from 'twind';

import ModelForm from '../../../components/model-form/ModelForm';
import { uploadModel } from '../../../api/models.api';

const ModelUploadPage = () => {
  return (
    <div className="mx-20 px-6 md:mt-12">
      <h1 className={tw`text(center black xl) font-semibold`}>
        Upload a new model
      </h1>
      <ModelForm onFormSubmit={uploadModel} />
    </div>
  );
};

export default ModelUploadPage;
