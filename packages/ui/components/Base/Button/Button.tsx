import {
  ButtonHTMLAttributes,
} from 'react';
import './button.scss';
import {FaIcon} from '../FaIcon/FaIcon';

export type CustomAttributes = {
  contentEditable?: 'inherit' | boolean,
  size?: 'xs' | 'sm' | 'md',
  round?: boolean,
  colorType?: 'type-2'
};

const getSizeClas = (size: 'xs' | 'sm' | 'md' | undefined) => {
  if (size === 'xs') {
    return "btn-xs";
  } else if (size === 'sm') {
    return "btn-sm";
  } else if (size === 'md') {
    return "btn-md";
  }
  return '';
};

const getRoundClass = (round: boolean |  undefined) => {
  if (round) {
    return "btn-round";
  }
  return '';
};


export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement> & CustomAttributes) => {
  const { children, size, round, className, colorType } = props;
  const sClass = getSizeClas(size);
  const rClass = getRoundClass(round);
  const btnColorType = colorType ? `btn-color-${colorType}` : '';
  const classNameFinal = ` btn ${sClass} ${rClass} ${className || ''} ${btnColorType} `;
  return <button type={"button"} role={"button"} className={classNameFinal} {...props} >{children}</button>;
};


export type CustomAttributesCloseButton = CustomAttributes & {
  label?: string
};

export const CloseButton = (props: ButtonHTMLAttributes<HTMLButtonElement> & CustomAttributesCloseButton) => {
  const { label } = props;
  return label ? <Button {...props} ><FaIcon icon={"times"} />&nbsp;{label}</Button> : <Button {...props} ><FaIcon icon={"times"} /></Button>;
};
