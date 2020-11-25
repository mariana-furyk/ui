import { mainHttpClient } from '../httpClient'

const fetchArtifacts = (item, path) => {
  let url = path

  if (item?.labels) {
    let labels = item?.labels
      ?.split(',')
      .map(item => `label=${item}`)
      .join('&')

    url = `${url}&${labels}`
  }

  if (item?.tag && !/latest/i.test(item.tag)) {
    url = `${url}&tag=${item.tag}`
  }

  if (item?.name) {
    url = `${url}&name=${item.name}`
  }

  return mainHttpClient.get(url)
}

export default {
  getArtifactPreview: (schema, path, user) =>
    mainHttpClient.get('/files', {
      params: schema ? { schema, path, user } : { path, user }
    }),
  getArtifactTag: project =>
    mainHttpClient.get(`/projects/${project}/artifact-tags`),
  getArtifacts: item => {
    return fetchArtifacts(item, `/artifacts?project=${item.project}`)
  },
  getArtifactsDataSets: item => {
    return fetchArtifacts(
      item,
      `/artifacts?project=${item.project}&category=dataset`
    )
  },
  getArtifactsFiles: item => {
    return fetchArtifacts(
      item,
      `/artifacts?project=${item.project}&category=other`
    )
  },
  getArtifactsModels: item => {
    return fetchArtifacts(
      item,
      `/artifacts?project=${item.project}&category=model`
    )
  },
  getFeatureSets: item => {
    const initialUrl = `/projects/${item.project}/feature-sets`
    let url = initialUrl

    if (item?.labels) {
      let labels = item?.labels
        ?.split(',')
        .map(item => `label=${item}`)
        .join('&')

      url = `${url}?${labels}`
    }

    if (item?.name) {
      url = `${url === initialUrl ? `${url}?` : `${url}&`}name=${item.name}`
    }

    return mainHttpClient.get(url)
  },
  registerArtifact: (project, data) =>
    mainHttpClient.post(`/artifact/${project}/${data.uid}/${data.key}`, data)
}
