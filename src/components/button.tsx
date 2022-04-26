import React, { Fragment } from 'react'

interface IButton {
  onClick: () => void
  text: string
  type: string
}

const Button: React.FC<IButton> = (props: IButton) => {
  const btnType = ['positive', 'negative'].includes(props.type) ? props.type : 'default'

  return (
    <Fragment>
      <button className={['button', `button_${btnType}`].join(' ')} onClick={props.onClick}>
        {props.text}
      </button>
    </Fragment>
  )
}

export default Button
