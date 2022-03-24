import { FC, ReactNode } from 'react'
import { StyledButton } from '.'

type Props = {
  type: 'solidPurple' | 'solidGray' | 'solidCustom' | 'ghost' | 'ghostLight' | 'icon' | 'iconRounded';
  callback?: any;
  color?: string;
  backgroundColor?: string;
  hoverColor?: string;
  isDisabled?: boolean;
  className?: string;
  children?: ReactNode;
  width?: string;
  height?: string;
  isRound?: boolean;
  isSmall?: boolean;
}

const Button: FC<Props> = ({ 
  type, 
  callback, 
  color, 
  backgroundColor, 
  hoverColor,
  isDisabled, 
  className, 
  children, 
  width, 
  height,
  isRound,
  isSmall
}) => {
  return (
    <StyledButton 
      type={type} 
      color={color} 
      backgroundColor={backgroundColor} 
      hoverColor={hoverColor}
      isDisabled={isDisabled} 
      width={width} 
      height={height}
      isRound={isRound}
      isSmall={isSmall}
    >
      <button onClick={callback ? (e) => callback(e) : undefined} className={className}>
        {children}
      </button>
    </StyledButton>
  )
}

export default Button