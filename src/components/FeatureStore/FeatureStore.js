import React, { useCallback, useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Loader from '../../common/Loader/Loader'
import Content from '../../layout/Content/Content'
import RegisterArtifactPopup from '../RegisterArtifactPopup/RegisterArtifactPopup'

import artifactsAction from '../../actions/artifacts'
import {
  checkTabIsValid,
  fetchDataSetRowData,
  fetchFeatureRowData,
  fetchFeatureVectorRowData,
  generateDataSetsDetailsMenu,
  generateFeatureSetsDetailsMenu,
  generateFeatureVectorsDetailsMenu,
  generatePageData,
  handleApplyDetailsChanges,
  handleFetchData,
  navigateToDetailsPane
} from './featureStore.util'
import { handleArtifactTreeFilterChange } from '../../utils/handleArtifactTreeFilterChange'
import {
  DATASETS_TAB,
  FEATURE_SETS_TAB,
  FEATURE_VECTORS_TAB,
  FEATURES_TAB
} from '../../constants'
import notificationActions from '../../actions/notification'
import './featureStore.scss'

const FeatureStore = ({
  artifactsStore,
  fetchDataSet,
  fetchDataSets,
  fetchFeature,
  fetchFeatureSets,
  fetchFeatureVector,
  fetchFeatureVectors,
  fetchFeatures,
  history,
  match,
  removeDataSet,
  removeDataSets,
  removeFeature,
  removeFeatureSets,
  removeFeatureVector,
  removeFeatureVectors,
  setArtifactFilter,
  setNotification,
  updateFeatureSetData
}) => {
  const [content, setContent] = useState([])
  const [yamlContent, setYamlContent] = useState({
    allData: [],
    selectedRowData: []
  })
  const [groupFilter, setGroupFilter] = useState('')
  const [selectedItem, setSelectedItem] = useState({})
  const [isPopupDialogOpen, setIsPopupDialogOpen] = useState(false)
  const [pageData, setPageData] = useState({
    actionsMenu: [],
    detailsMenu: [],
    filters: [],
    infoHeaders: [],
    page: '',
    registerArtifactDialogTitle: '',
    tabs: []
  })
  const [selectedRowId, setSelectedRowId] = useState('')
  const featureStoreRef = useRef(null)

  const fetchData = useCallback(
    async item => {
      const data = await handleFetchData(
        featureStoreRef,
        fetchDataSets,
        fetchFeatureSets,
        fetchFeatures,
        fetchFeatureVectors,
        item,
        match.params.pageTab
      )

      if (data.content) {
        setContent(data.content)
        setYamlContent(state => ({ ...state, allData: data.yamlContent }))
      }

      return data.yamlContent
    },
    [
      match.params.pageTab,
      fetchDataSets,
      fetchFeatureSets,
      fetchFeatures,
      fetchFeatureVectors
    ]
  )

  const handleRemoveFeatureVector = useCallback(
    featureVector => {
      const newSelectedRowData = {
        ...artifactsStore.featureVectors.selectedRowData
      }

      delete newSelectedRowData[featureVector.name]

      removeFeatureVector(newSelectedRowData)
    },
    [artifactsStore.featureVectors.selectedRowData, removeFeatureVector]
  )

  const handleRemoveFeature = useCallback(
    feature => {
      const newSelectedRowData = {
        ...artifactsStore.features.selectedRowData
      }

      delete newSelectedRowData[`${feature.name}-${feature.metadata.name}`]

      removeFeature(newSelectedRowData)
    },
    [artifactsStore.features.selectedRowData, removeFeature]
  )

  const handleRemoveDataSet = useCallback(
    dataSet => {
      const newSelectedRowData = {
        ...artifactsStore.dataSets.selectedRowData
      }

      delete newSelectedRowData[dataSet.db_key]

      removeDataSet(newSelectedRowData)
    },
    [artifactsStore.dataSets.selectedRowData, removeDataSet]
  )

  const handleRequestOnExpand = useCallback(
    async item => {
      if (match.params.pageTab === FEATURES_TAB) {
        await fetchFeatureRowData(
          fetchFeature,
          item,
          setPageData,
          setYamlContent
        )
      } else if (match.params.pageTab === FEATURE_VECTORS_TAB) {
        await fetchFeatureVectorRowData(
          fetchFeatureVector,
          item,
          setPageData,
          setYamlContent
        )
      } else if (match.params.pageTab === DATASETS_TAB) {
        await fetchDataSetRowData(
          fetchDataSet,
          item,
          setPageData,
          setYamlContent
        )
      }
    },
    [fetchDataSet, fetchFeature, fetchFeatureVector, match.params.pageTab]
  )

  const handleExpandRow = useCallback(
    (item, isCollapse) => {
      if (match.params.pageTab !== FEATURE_SETS_TAB && isCollapse) {
        setYamlContent(state => ({
          ...state,
          selectedRowData: []
        }))
      }
    },
    [match.params.pageTab]
  )

  useEffect(() => {
    fetchData({ project: match.params.projectName, onEntering: true })

    return () => {
      setContent([])
      setYamlContent({
        allData: [],
        selectedRowData: []
      })
      setGroupFilter('')
      removeDataSets()
      removeFeatureSets()
      removeFeatureVectors()
      setSelectedItem({})
      setArtifactFilter({ tag: 'latest', labels: '', name: '' })
      setSelectedRowId('')
    }
  }, [
    fetchData,
    match.params.projectName,
    removeDataSets,
    removeFeatureSets,
    featureStoreRef,
    removeFeatureVectors,
    setArtifactFilter
  ])

  useEffect(() => {
    if (
      match.params.pageTab === FEATURE_SETS_TAB ||
      ([FEATURES_TAB, FEATURE_VECTORS_TAB, DATASETS_TAB].includes(
        match.params.pageTab
      ) &&
        artifactsStore.filter.tag === 'latest')
    ) {
      setGroupFilter('name')
    } else if (groupFilter.length > 0) {
      setGroupFilter('')
    }
  }, [match.params.pageTab, groupFilter.length, artifactsStore.filter])

  useEffect(() => {
    setPageData(state => {
      return {
        ...state,
        ...generatePageData(
          match.params.pageTab,
          handleRequestOnExpand,
          match.params.pageTab === FEATURE_VECTORS_TAB
            ? handleRemoveFeatureVector
            : match.params.pageTab === FEATURES_TAB
            ? handleRemoveFeature
            : handleRemoveDataSet
        )
      }
    })
  }, [
    handleRemoveFeatureVector,
    handleRequestOnExpand,
    handleRemoveFeature,
    match.params.pageTab,
    handleRemoveDataSet
  ])

  useEffect(() => {
    navigateToDetailsPane(artifactsStore, history, match, setSelectedItem)
  }, [history, artifactsStore, match])

  useEffect(() => {
    checkTabIsValid(history, match, selectedItem)

    setPageData(state => {
      if (match.params.pageTab === FEATURE_SETS_TAB) {
        return {
          ...state,
          detailsMenu: [...generateFeatureSetsDetailsMenu(selectedItem)]
        }
      } else if (match.params.pageTab === FEATURE_VECTORS_TAB) {
        return {
          ...state,
          detailsMenu: [...generateFeatureVectorsDetailsMenu(selectedItem)]
        }
      } else if (match.params.pageTab === DATASETS_TAB) {
        return {
          ...state,
          detailsMenu: [...generateDataSetsDetailsMenu(selectedItem)]
        }
      }

      return { ...state }
    })
  }, [
    history,
    selectedItem.item,
    selectedItem.entities,
    match.params.pageTab,
    selectedItem,
    match
  ])

  const handleTreeFilterChange = useCallback(
    item => {
      if (match.params.name) {
        history.push(
          `/projects/${match.params.projectName}/feature-store/${match.params.pageTab}`
        )
      }

      setContent([])
      handleArtifactTreeFilterChange(
        fetchData,
        artifactsStore.filter,
        item,
        match.params.projectName,
        setArtifactFilter
      )
    },
    [
      artifactsStore.filter,
      fetchData,
      history,
      match.params.name,
      match.params.pageTab,
      match.params.projectName,
      setArtifactFilter
    ]
  )

  const applyDetailsChanges = changes => {
    return handleApplyDetailsChanges(
      changes,
      fetchData,
      match,
      selectedItem,
      setNotification,
      updateFeatureSetData
    )
  }

  return (
    <div ref={featureStoreRef} className="feature-store-container">
      {artifactsStore.loading && <Loader />}
      <Content
        applyDetailsChanges={applyDetailsChanges}
        cancelRequest={message => {
          featureStoreRef.current?.cancel &&
            featureStoreRef.current.cancel(message)
        }}
        content={content}
        expandRow={handleExpandRow}
        groupFilter={groupFilter}
        handleArtifactFilterTree={handleTreeFilterChange}
        handleCancel={() => setSelectedItem({})}
        loading={artifactsStore.loading}
        match={match}
        openPopupDialog={() =>
          match.params.pageTab === DATASETS_TAB && setIsPopupDialogOpen(true)
        }
        pageData={pageData}
        refresh={item => {
          fetchData(item)
        }}
        selectedItem={selectedItem.item}
        selectedRowId={selectedRowId}
        setSelectedRowId={id =>
          setSelectedRowId(selectedRowId === id ? '' : id)
        }
        yamlContent={yamlContent}
      />
      {isPopupDialogOpen && (
        <RegisterArtifactPopup
          artifactFilter={artifactsStore.filter}
          artifactKind={match.params.pageTab.slice(0, -1)}
          match={match}
          refresh={fetchData}
          setIsPopupDialogOpen={setIsPopupDialogOpen}
          title={pageData.registerArtifactDialogTitle}
        />
      )}
    </div>
  )
}

FeatureStore.propTypes = {
  match: PropTypes.shape({}).isRequired
}

export default connect(artifactsStore => artifactsStore, {
  ...artifactsAction,
  ...notificationActions
})(FeatureStore)
