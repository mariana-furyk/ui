import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import classnames from 'classnames'

import TableCell from '../TableCell/TableCell'
import TableActionsMenu from '../../common/TableActionsMenu/TableActionsMenu'

import { formatDatetime } from '../../utils'
import { detailsMenu } from '../../components/FunctionsPage/functions.util'

const FunctionsTableRow = ({
  actionsMenu,
  content,
  handleExpandRow,
  handleSelectItem,
  index,
  match,
  rowItem,
  selectedItem,
  tableContent
}) => {
  const parent = useRef()

  const selectedItemDate =
    selectedItem.updated && formatDatetime(new Date(selectedItem.updated))
  const indentUpdatedOnMainRow = isEqual(
    rowItem.updated.value,
    selectedItemDate
  )
  const indentHashOnMainRow = isEqual(rowItem.hash.value, selectedItem.hash)
  const rowClassNames = classnames(
    'table-body__row',
    'parent-row',
    indentUpdatedOnMainRow &&
      indentHashOnMainRow &&
      !parent.current?.classList.value.includes('parent-row-expanded') &&
      'row_active',
    parent.current?.classList.value.includes('parent-row-expanded') &&
      'parent-row-expanded'
  )

  return (
    <div className={rowClassNames} ref={parent}>
      {parent.current?.classList.contains('parent-row-expanded') ? (
        <div className="row_grouped-by">
          <div className="table-body__row">
            <TableCell
              handleExpandRow={handleExpandRow}
              data={rowItem.name}
              item={rowItem}
              selectItem={handleSelectItem}
              selectedItem={selectedItem}
              expandLink
              firstRow
            />
          </div>
          <>
            {tableContent.map((func, index) => {
              const indentUpdatedOnSubRow = isEqual(
                selectedItemDate,
                func.updated.value
              )
              const indexHashOnSubRow = isEqual(
                func.hash.value,
                selectedItem.hash
              )

              return (
                <div
                  className={`table-body__row ${indentUpdatedOnSubRow &&
                    indexHashOnSubRow &&
                    'row_active'}`}
                  key={index}
                >
                  {Object.values(func).map((value, i) => {
                    const currentItem =
                      content.length > 0 &&
                      content.find(item => {
                        return (
                          formatDatetime(new Date(item.updated)) ===
                            func.updated.value && item.hash === func.hash.value
                        )
                      })

                    return (
                      <TableCell
                        data={i === 0 ? func.updated : value}
                        item={currentItem}
                        link={
                          i === 0 &&
                          `/projects/${match.params.projectName}/functions/${
                            currentItem?.hash
                          }${
                            match.params.tab
                              ? `/${match.params.tab}`
                              : `/${detailsMenu[0]}`
                          }`
                        }
                        key={value.value + i}
                        selectItem={handleSelectItem}
                        selectedItem={selectedItem}
                      />
                    )
                  })}
                  <div className="table-body__cell action_cell">
                    <TableActionsMenu
                      item={content[index]}
                      menu={actionsMenu}
                    />
                  </div>
                </div>
              )
            })}
          </>
        </div>
      ) : (
        <>
          {Object.values(rowItem).map((value, i) => {
            const currentContentItem = content.filter(
              contentItem =>
                isEqual(contentItem.hash, rowItem.hash.value) &&
                isEqual(
                  formatDatetime(new Date(contentItem.updated)),
                  rowItem.updated.value
                )
            )[0]
            return (
              <TableCell
                data={value}
                expandLink={Array.isArray(tableContent)}
                handleExpandRow={handleExpandRow}
                item={currentContentItem}
                key={value.value + i}
                link={
                  i === 0 &&
                  `/projects/${
                    match.params.projectName
                  }/functions/${content.length > 0 &&
                    currentContentItem?.hash}/${
                    match.params.tab
                      ? match.params.tab
                      : `${detailsMenu[0].toLowerCase()}`
                  }`
                }
                match={match}
                selectedItem={selectedItem}
                selectItem={handleSelectItem}
              />
            )
          })}
          <div className="table-body__cell action_cell">
            <TableActionsMenu item={content[index]} menu={actionsMenu} />
          </div>
        </>
      )}
    </div>
  )
}

FunctionsTableRow.propTypes = {
  actionsMenu: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSelectItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  match: PropTypes.shape({}).isRequired,
  rowItem: PropTypes.shape({}).isRequired,
  selectedItem: PropTypes.shape({}).isRequired
}

export default FunctionsTableRow
