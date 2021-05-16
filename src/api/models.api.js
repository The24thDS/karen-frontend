import { getBearerToken } from "utils/general";

const API_URL = process.env.API_URL || "http://localhost:3001";

export const fetchModels = async () => {
  const res = await fetch(`${API_URL}/models`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error("Server did not return OK");
  }
};

export const fetchModel = async (slug) => {
  const res = await fetch(`${API_URL}/models/${slug}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error("Server did not return OK");
  }
};

export const uploadModel = async (data) => {
  const res = await fetch(`${API_URL}/models`, {
    headers: {
      Authorization: getBearerToken(),
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error("Server did not return OK");
  }
};

export const updateModel = async (data, slug) => {
  const res = await fetch(`${API_URL}/models/${slug}`, {
    headers: {
      Authorization: getBearerToken(),
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  console.log("result:", res);
  const response = await res.json();
  console.log("api response:", response);
  return response;
};

export const searchModels = async (data) => {
  const res = await fetch(`${API_URL}/models/search`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error("Server did not return OK");
  }
};
