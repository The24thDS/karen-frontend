import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { tw } from 'twind';

import ModelFormImageAndInformation from './partials/ModelFormImageAndInformation';
import ModelForm3dFiles from './partials/ModelForm3dFiles';
import Error from 'components/error/Error';

import './model-form.css';

const ModelForm = ({ initialModel, onFormSubmit }) => {
  const [formStatus, setFormStatus] = useState({
    loading: false,
    done: false,
    redirect: false,
    modelSlug: '',
    step: 0,
    data: {},
    serverErrors: [],
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
      if (initialModel) {
        data.gltf = data.gltf.filter((file) => !file.old);
        data.images = data.images.filter((file) => !file.old);
        data.models = data.models.filter((file) => !file.old);
      }
      const resData = await onFormSubmit(data);
      console.log(resData);
      if (resData.statusCode && resData.statusCode !== 201) {
        setFormStatus({
          ...formStatus,
          loading: false,
          done: false,
          serverErrors:
            typeof resData.message === 'string'
              ? [resData.message]
              : resData.message,
        });
      } else {
        setFormStatus({
          ...formStatus,
          loading: false,
          done: true,
        });
        setTimeout(() => {
          setFormStatus({
            ...formStatus,
            modelSlug: initialModel?.model?.slug ?? resData.slug,
            redirect: true,
          });
        }, 1500);
      }
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

  const sectionStyle = tw`font-semibold text-gray-700`;

  return (
    <>
      {formStatus.step === 0 && (
        <ModelFormImageAndInformation
          sectionStyle={sectionStyle}
          onButtonClick={nextStep}
          initialModel={initialModel}
        />
      )}
      {formStatus.step === 1 && (
        <ModelForm3dFiles
          sectionStyle={sectionStyle}
          onButtonClick={onSubmit}
          getButtonText={buttonText}
          initialModel={initialModel}
        />
      )}
      {formStatus.serverErrors.length > 0 &&
        formStatus.serverErrors.map((error, index) => (
          <Error key={error + index} message={error} />
        ))}
      {formStatus.redirect && (
        <Redirect to={`/models/${formStatus.modelSlug}`} />
      )}
    </>
  );
};

export default ModelForm;
