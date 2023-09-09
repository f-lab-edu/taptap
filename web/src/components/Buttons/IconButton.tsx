import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
}

const IconButton = ({ icon, ...rest }: Props) => {
  return (
    <button className="flex	h-12 w-12 items-center justify-center" {...rest}>
      {icon}
    </button>
  )
}

export default IconButton
