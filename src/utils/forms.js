export const jsonToFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key]) || data[key].item) {
      for (let i = 0; i < data[key].length; i++) {
        formData.append(key, data[key][i]);
      }
    } else if (typeof data[key] === 'object') {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
