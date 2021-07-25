import client from "./client";

const filesEndpoint = "/shift-docs";
const foldersEndpoint = "/shift-docs/folder";

const getShiftDocFolders = (...args) => client.get(foldersEndpoint, ...args);
const getShiftDocs = (...args) => client.get(filesEndpoint, ...args);
const deleteFile = (id) => client.delete(`${filesEndpoint}/${id}`);

const updateFolder = (id, data) => client.put(`${foldersEndpoint}/${id}`, data);
const deleteFolder = (id) => client.delete(`${foldersEndpoint}/${id}`);
const createFolder = (data) => client.post(foldersEndpoint, data);

const createShiftDoc = (docData, onUploadProgress) => {
  const data = new FormData();
  data.append("stationID", load.station);
  data.append("file",{name: "i"})

  if (docData.files) {
    docData.files.forEach((image, index) => {
      data.append("docs", {
        name: "image" + index + ".jpg",
        type: "image/jpeg",
        uri: image,
      });
    });
  }

  return client.post(filesEndpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getShiftDocFolders,
  getShiftDocs,
  deleteFile,
  updateFolder,
  deleteFolder,
  createFolder,
  createShiftDoc
};
