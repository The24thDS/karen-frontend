import React from "react";
import ModelForm from "components/model-form/ModelForm";
import { useParams } from "react-router";
import { useModel } from "components/model/custom-hooks";
import { tw } from "twind";
import { updateModel } from "api/models.api";

const EditModelPage = () => {
  const { slug } = useParams();
  const model = useModel(slug);
  return (
    <div className="px-6 mx-20 md:mt-12">
      <h1 className={tw`text(center black xl) font-semibold`}>
        Editing model <em>{slug}</em>
      </h1>
      <ModelForm
        initialModel={model}
        onFormSubmit={(data) => updateModel(data, slug)}
      />
    </div>
  );
};

export default EditModelPage;
