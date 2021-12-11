import { LoaderSvg } from './loader.svg';
import React, { FC } from "react";
import style from './loader.module.css';

export const Loader: FC = () => {
  const loaderColor = '#4C4CFF';

  return (
    <div className={style.wrapper} >
      <LoaderSvg color={loaderColor}  />
    </div>
  );
};