import { LoaderSvg } from './loader.svg';
import React, { FC } from "react";
import style from './loader.module.css';

type TLoaderProps = {
  size:  number;
  inverse: boolean;
}

// const loaderSizes: {small: number, medium: number, large: number } = {
//   small: 16,
//   medium: 24,
//   large: 40
// };
export const Loader: FC<TLoaderProps> = ({ size, inverse = true }) => {
  //const loaderColor = inverse ? '#fff' : '#3C39EC';
  const loaderColor = '#4C4CFF';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} siz={size} />
    </div>
  );
};