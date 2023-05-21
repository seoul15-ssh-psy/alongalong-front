import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/board`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, file, success, fail) {
  let formData = new FormData();
  formData.append("img", file);
  formData.append("userid", article.userid);
  formData.append("subject",article.subject);
  formData.append("content",article.content);
  api.post(`/board`,formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/board/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/board/${articleno}`).then(success).catch(fail);
}

function uploadFile(file, success, fail) { 
  let formData = new FormData();
  formData.append("img",file);
  api.post(`/file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(success).catch(fail);
}

function downloadFile(articleno,success,fail) { 
  api.get(`/file/${articleno}`).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle, uploadFile, downloadFile};
