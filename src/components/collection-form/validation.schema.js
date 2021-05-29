import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().min(1).required(),
  test: yup.string().min(1).required(),
  visibility: yup.string().min(1).required(),
});
