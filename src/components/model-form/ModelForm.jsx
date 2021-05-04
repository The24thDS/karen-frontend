import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { tw } from 'twind';

import { jsonToFormData } from '../../utils/forms';
import ModelFormImageAndInformation from './partials/ModelFormImageAndInformation';
import ModelForm3dFiles from './partials/ModelForm3dFiles';

import './model-form.css';

const ModelForm = ({ initialModel, initialTags, onFormSubmit }) => {
  const [formStatus, setFormStatus] = useState({
    loading: false,
    done: false,
    redirect: false,
    modelSlug: '',
    step: 0,
    data: {},
  });

  const onSubmit = async (lastData) => {
    setFormStatus({
      ...formStatus,
      loading: true,
      data: {
        ...formStatus.data,
        ...lastData,
      },
    });
    const data = {
      ...formStatus.data,
      ...lastData,
    };
    try {
      data.tags = data.tags.map((tag) => tag.value);
      const formData = jsonToFormData(data);
      const resData = await onFormSubmit(formData);
      setFormStatus({
        ...formStatus,
        loading: false,
        done: true,
      });
      setTimeout(() => {
        setFormStatus({
          ...formStatus,
          modelSlug: resData.slug,
          redirect: true,
        });
      }, 1500);
    } catch (e) {
      setFormStatus({
        ...formStatus,
        loading: false,
      });
    }
  };

  const buttonText = () => {
    if (formStatus.loading) {
      return 'Uploading...';
    }
    if (formStatus.done) {
      return 'Done!';
    }
    return 'Upload';
  };

  const nextStep = (data) => {
    setFormStatus({
      ...formStatus,
      data: {
        ...formStatus.data,
        ...data,
      },
      step: formStatus.step + 1,
    });
  };

  const sectionStyle = tw`text-gray-700 font-semibold`;

  return (
    <>
      {formStatus.step === 0 && (
        <ModelFormImageAndInformation
          sectionStyle={sectionStyle}
          onButtonClick={nextStep}
        />
      )}
      {formStatus.step === 1 && (
        <ModelForm3dFiles
          sectionStyle={sectionStyle}
          onButtonClick={onSubmit}
          getButtonText={buttonText}
        />
      )}
      {formStatus.redirect && (
        <Redirect to={`/models/${formStatus.modelSlug}`} />
      )}
    </>
  );
};

export default ModelForm;
