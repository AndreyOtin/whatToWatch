import { FaSpinner } from 'react-icons/fa';
import cl from './spinner.module.css';
import classNames from 'clsx';
import { CSSProperties } from 'react';

type SpinnerProps = {
  isActive: boolean;
  children?: JSX.Element;
  variant?: 'small' | 'primary' | 'secondary';
  style?: CSSProperties;
}

const Spinner = ({ children, style, variant = 'primary', isActive = false }: SpinnerProps) => (
  isActive
    ?
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: variant === 'primary' ? '100vh' : '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg,#180202 0%,#000 100%)',
      ...style
    }}
    >
      <FaSpinner role="presentation" className={classNames(cl.spinner, cl[variant])}/>
    </div>
    : children || null
);

export default Spinner;
