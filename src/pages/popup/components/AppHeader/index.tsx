import React from "react"
import PropTypes from "prop-types"

import {ReactComponent as Padella} from "../../../assets/svgs/padella.svg"
import {ReactComponent as AuraEffect} from "../../../assets/svgs/aura.svg"
import {ReactComponent as Logo} from "../../../assets/svgs/arancina.svg"

import './index.css'

AppHeader.propTypes = {
  watchMode: PropTypes.bool,
}
export default function AppHeader ({watchMode}) {
  return (
    <div className={'animation-wrapper'}>
      <Padella className={`padella ${watchMode ? 'on-fire' : ''}`} />
      <AuraEffect className={'aura'} />
      <Logo className={'arancina'} />
    </div>
  )
}
