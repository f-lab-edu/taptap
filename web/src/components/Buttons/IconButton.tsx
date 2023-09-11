import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
}

const IconButton = ({ icon, ...rest }: Props) => {
  return (
    <button
      className="flex	h-10 w-10 items-center justify-center focus:outline-none"
      {...rest}
    >
      {icon}
    </button>
  )
}

export default IconButton
