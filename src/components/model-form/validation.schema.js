import * as yup from 'yup';
const validator = require('gltf-validator');

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
  gltf: yup
    .mixed()
    .test('required', 'At least a gltf file is required', (value) => {
      if (value.length) {
        const gltfModelFile = value.find((file) => file.name.endsWith('.gltf'));
        if (gltfModelFile) {
          return true;
        }
      }
      return false;
    })
    .test('valid', async (value, testContext) => {
      if (value.length) {
        const gltfModelFile = value.find((file) => file.name.endsWith('.gltf'));
        if (gltfModelFile) {
          const arrayBuffer = await gltfModelFile.arrayBuffer();
          const result = await validator.validateBytes(
            new Uint8Array(arrayBuffer),
            {
              externalResourceFunction: (uri) =>
                new Promise(async (resolve, reject) => {
                  const splitURI = uri.split('/');
                  const resource = value.find(
                    (file) => file.name === splitURI[splitURI.length - 1]
                  );
                  if (resource) {
                    const arrayBuffer = await resource.arrayBuffer();
                    resolve(new Uint8Array(arrayBuffer));
                  } else {
                    reject(
                      `${uri} is referenced in the GLTF object but it was not selected by the user.`
                    );
                  }
                }),
            }
          );
          if (result.issues.numErrors === 0) {
            return true;
          } else {
            const errorMessages = result.issues.messages.map(
              (msgObj) => msgObj.message
            );
            const message = `${JSON.stringify(errorMessages)}`;
            return testContext.createError({
              message,
            });
          }
        }
      }
      return false;
    }),
});
