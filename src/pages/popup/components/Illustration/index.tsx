import React, {useCallback} from "react"
import PropTypes from "prop-types"

import {ReactComponent as Padella} from "../../../assets/svgs/padella.svg"
import {ReactComponent as AuraEffect} from "../../../assets/svgs/aura.svg"
import {ReactComponent as Arancina} from "../../../assets/svgs/arancina.svg"

import './index.css'

Illustration.propTypes = {
  watchMode: PropTypes.bool,
}
export default function Illustration ({watchMode}) {
  const onFire = useCallback((name) => {
    return watchMode ? `${name} on-fire` : name
  }, [watchMode])

  return (
    <div className={'illustration-wrapper'}>
      <Padella className={onFire('padella')} />
      <AuraEffect className={onFire('aura')} />
      <Arancina className={onFire('arancina')} />
    </div>
  )
}
