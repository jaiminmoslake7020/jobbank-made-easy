import {
  ButtonHTMLAttributes,
} from 'react';
import './button.scss';

export type CustomAttributes = {
  contentEditable?: 'inherit' | boolean
};


export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement> & CustomAttributes) => {
  const { children } = props;
  return <button role={"button"} className=" btn " {...props} >{children}</button>;
};
