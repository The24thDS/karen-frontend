import * as yup from 'yup';

const optionObject = yup.object().shape({
  label: yup.string().required(),
  value: yup.string().required(),
});

export const ModelFormSchemaStep1 = yup.object().shape({
  name: yup.string().required().min(5),
  description: yup.string().required(),
  images: yup
    .mixed()
    .test('required', 'At least 1 image is required', (value) => {
      return value.length > 0;
    }),
  tags: yup.array().of(optionObject).min(5).required(),
});

export const ModelFormSchemaStep2 = yup.object().shape({
  models: yup.mixed().test('required', 'A 3D file is required', (value) => {
    return value.length > 0;
  }),
  gltf: yup.mixed().test('required', 'A gltf file is required', (value) => {
    return value.length > 0;
  }),
});
