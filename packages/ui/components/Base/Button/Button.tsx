import {
  ButtonHTMLAttributes,
} from 'react';
import './button.scss';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children } = props;
  return <button className=" btn " {...props} >{children}</button>;
};
