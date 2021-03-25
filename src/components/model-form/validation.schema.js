import * as yup from 'yup';

const optionObject = yup.object().shape({
  label: yup.string().required(),
  value: yup.string().required(),
});

export const ModelFormSchema = yup.object().shape({
  name: yup.string().required().min(15),
  description: yup.string().required().min(100),
  images: yup
    .mixed()
    .test('required', 'At least 1 image is required', (value) => {
      return value.length > 0;
    }),
  models: yup.mixed().test('required', 'A 3D file is required', (value) => {
    return value.length > 0;
  }),
  tags: yup.array().of(optionObject).min(5).required(),
});
