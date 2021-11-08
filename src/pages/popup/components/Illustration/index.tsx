import React, {useCallback, useState} from "react"
import PropTypes from "prop-types"

import {ReactComponent as Padella} from "../../../assets/svgs/padella.svg"
import {ReactComponent as AuraEffect} from "../../../assets/svgs/aura.svg"
import Arancina from './Arancina'

import './index.css'

let timer
const intervalMilliseconds = 500

Illustration.propTypes = {
  watchMode: PropTypes.bool,
}
export default function Illustration ({watchMode}) {
  const [animationDurationValue, setAnimationDurationValue] = useState(80)
  const onFire = useCallback((name) => {
    return watchMode ? `${name} on-fire` : name
  }, [watchMode])
  
  const onClick = () => {
    console.log('if timer clean', timer)
    if (timer) clearTimeout(timer)

    setAnimationDurationValue(prevState => {
      return prevState - 10
    })

    timer = setTimeout(() => {
      setAnimationDurationValue(80)
    }, intervalMilliseconds)
    console.log('timer set', timer)
  }

  return (
    <div className={'illustration-wrapper'}>
      <Padella className={onFire('padella')} />
      <AuraEffect className={onFire('aura')} />
      <Arancina
        animationDuration={animationDurationValue}
        onClick={onClick}
        watchMode={watchMode}
      />
    </div>
  )
}
