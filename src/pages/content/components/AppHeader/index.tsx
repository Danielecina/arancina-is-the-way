import React from "react"

import {ReactComponent as Padella} from "../../svgs/padella.svg"
import {ReactComponent as AuraEffect} from "../../svgs/aura.svg"
import {ReactComponent as Logo} from "../../svgs/arancina.svg"

import './index.css'

export default function AppHeader () {
  return (
    <div className={'animation-wrapper'}>
      <Padella className={'padella'} />
      <AuraEffect className={'aura'} />
      <Logo className={'arancina'} />
    </div>
  )
}
