import React, {useCallback} from 'react'

import {ReactComponent as FryingPan} from '../../../../assets/svgs/fryingPan.svg'
import {ReactComponent as AuraEffect} from '../../../../assets/svgs/aura.svg'
import {ReactComponent as Arancina} from '../../../../assets/svgs/arancina.svg'

import './index.css'

const Illustration: React.FC<{watchMode: boolean}> = ({watchMode}) => {
  const onFire = useCallback((name) => {
    return watchMode ? `${name} on-fire` : name
  }, [watchMode])

  return (
    <div className={'illustration-wrapper'} title={'arancina-illustration'}>
      <FryingPan className={onFire('fryingPan')} />
      <AuraEffect className={onFire('aura')} />
      <Arancina className={onFire('arancina')} />
    </div>
  )
}

export default Illustration
