import { mainHttpClient } from '../httpClient'

export default {
  getArtifactPreview: (schema, path, user) =>
    mainHttpClient.get('/files', {
      params: schema ? { schema, path, user } : { path, user }
    }),
  getArtifactTag: project =>
    mainHttpClient.get(`/projects/${project}/artifact-tags`),
  getArtifacts: item => {
    let url = `/artifacts?project=${item.project}`

    if (item?.labels) {
      let labels = item?.labels
        ?.split(',')
        .map(item => `label=${item}`)
        .join('&')

      url = `${url}&${labels}`
    }

    if (item?.tag) {
      url = `${url}&tag=${item.tag}`
    }

    if (item?.name) {
      url = `${url}&name=${item.name}`
    }

    return mainHttpClient.get(url)
  },
  getArtifactsDataSets: project =>
    mainHttpClient.get(`/artifacts?project=${project}&category=dataset`),
  getArtifactsFiles: project =>
    mainHttpClient.get(`/artifacts?project=${project}&category=other`),
  getArtifactsModels: project =>
    mainHttpClient.get(`/artifacts?project=${project}&category=model`),
  registerArtifact: (project, data) =>
    mainHttpClient.post(`/artifact/${project}/${data.uid}/${data.key}`, data)
}
