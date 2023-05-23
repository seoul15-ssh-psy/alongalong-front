import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/hotplace`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, file, success, fail) {
  let formData = new FormData();
  formData.append("img", file);
  formData.append("userid", article.userid);
  formData.append("subject",article.subject);
  formData.append("content",article.content);
  api.post(`/hotplace/withfile`,formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(success).catch(fail);
}

function writeArticle2(article, success, fail) {
  let formData = new FormData();
  formData.append("userid", article.userid);
  formData.append("subject",article.subject);
  formData.append("content",article.content);
  api.post(`/hotplace/withoutfile`,formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/hotplace/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/hotplace`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/hotplace/${articleno}`).then(success).catch(fail);
}

function getTotalCount(param, success, fail) { 
  api.get(`/hotplace/getTotalCount`, {params:param}).then(success).catch(fail);
}

function writeComment(comment, success, fail) { 
  api.post(`/hotplace/comment`, comment).then(success).catch(fail);
}

function getComments(articleno, success, fail) { 
  api.get(`/hotplace/comment/${articleno}`).then(success).catch(fail);
}

export { listArticle, writeArticle, writeArticle2, getArticle, modifyArticle, deleteArticle,  getTotalCount, writeComment, getComments};
