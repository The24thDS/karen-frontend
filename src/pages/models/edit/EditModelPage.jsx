import React from 'react';
import ModelForm from '../../../components/model-form/ModelForm';
import Nav from '../../../components/nav/Nav';
import { useParams } from 'react-router';
import { useModel } from '../../../components/model/custom-hooks';

function EditModelPage() {
  const { id } = useParams();
  const { model, user, tags } = useModel(id);
  return (
    <>
      <Nav showBrand showSearch />
      <div className="max-w-sm mx-auto px-6 md:mt-12">
        <h1 className="text-center font-semibold text-black text-xl">
          Edit this model
        </h1>
        <ModelForm />
      </div>
    </>
  );
}

export default EditModelPage;
