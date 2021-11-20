import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

BoxList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    actions: PropTypes.node,
    extra: PropTypes.node
  })).isRequired
}
export default function BoxList ({rows}) {
  return (
    <main className={'box'}>
      {rows.map(({content, actions, extra, id}) => {
        return (
          <BoxRow key={id}>
            <BoxRowContent>{content}</BoxRowContent>
            <BoxRowActions>{actions}</BoxRowActions>
            {extra}
          </BoxRow>
        )
      })}
    </main>
  )
}

BoxRow.propTypes = {children: PropTypes.node.isRequired}
export function BoxRow ({children}) {
  return <div className={'box-row'}>{children}</div>
}

BoxRowContent.propTypes = {children: PropTypes.node.isRequired}
export function BoxRowContent ({children}) {
  return <div className={'box-row--title'}>{children}</div>
}

BoxRowActions.propTypes = {children: PropTypes.node.isRequired}
export function BoxRowActions ({children}) {
  return <div className={'box-row--actions'}>{children}</div>
}
