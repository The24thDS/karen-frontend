import React from 'react';
import ModelForm from '../../../components/model-form/ModelForm';

function NewModelPage() {
  return (
    <div className="max-w-sm mx-auto px-6 md:mt-12">
      <h1 className="text-center font-semibold text-black text-xl">
        Upload a new model
      </h1>
      <ModelForm />
    </div>
  );
}

export default NewModelPage;
