import React, {ReactNode} from 'react'

import './index.css'

export interface RowType {
  id: string,
  content: ReactNode,
  actions?: ReactNode,
  extra?: ReactNode
}
export type BoxListType = {
  rows: Array<RowType>
}
const BoxList: React.FC<BoxListType> = ({rows}) => (
  <main className={'box'}>
    {rows.map(({content, actions, extra, id}) => (
      <BoxRow key={id}>
        <BoxRowContent>{content}</BoxRowContent>
        <BoxRowActions>{actions}</BoxRowActions>
        {extra}
      </BoxRow>
    ))}
  </main>
)

export default BoxList

export const BoxRow: React.FC = ({children}) => {
  return <div className={'box-row'}>{children}</div>
}

export const BoxRowContent: React.FC = ({children}) => {
  return <div className={'box-row--title'}>{children}</div>
}

export const BoxRowActions: React.FC = ({children}) => {
  return <div className={'box-row--actions'}>{children}</div>
}
