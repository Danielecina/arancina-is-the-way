import React, {useCallback} from "react"
import PropTypes from "prop-types"

import {ReactComponent as Padella} from "../../../assets/svgs/padella.svg"
import {ReactComponent as AuraEffect} from "../../../assets/svgs/aura.svg"
import {ReactComponent as Logo} from "../../../assets/svgs/arancina.svg"

import './index.css'

AppHeader.propTypes = {
  watchMode: PropTypes.bool,
}
export default function AppHeader ({watchMode}) {
  const onFire = useCallback((name) => {
    return watchMode ? `${name} on-fire` : name
  }, [watchMode])

  return (
    <div className={'animation-wrapper'}>
      <Padella className={onFire('padella')} />
      <AuraEffect className={onFire('aura')} />
      <Logo className={onFire('arancina')} />
    </div>
  )
}
