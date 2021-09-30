import React from 'react'
import './Badge.scss'
import classNames from 'classnames'

export const Badge = ({ color, onClick, className }) => {
  return(
    <i onClick={onClick} className={classNames('badge', {[`badge--${color}`]: color}, className)}></i>
  )
}