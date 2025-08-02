'use client';

import {
  Corner as PrimitiveCorner,
  Root as PrimitiveRoot,
  Scrollbar as PrimitiveScrollbar,
  Thumb as PrimitiveThumb,
  Viewport as PrimitiveViewport,
} from '@radix-ui/react-scroll-area';
import classNames from 'classnames';
import { FC } from 'react';

import * as styles from './styles/scroll-area.css';
import { scrollAreaScrollbarRecipe } from './styles/scroll-area-scrollbar-recipe.css';
import { scrollAreaScrollbarThumbStyle } from './styles/scroll-area-scrollbar-thumb.css';
import { ScrollAreaRootProps } from './types';

export const ScrollArea: FC<ScrollAreaRootProps> = (props) => {
  const { children, className, size, ...rest } = props;
  const classes = classNames(styles.scrollAreaRootStyle, className);
  const scrollbarClasses = scrollAreaScrollbarRecipe({ size });

  return (
    <PrimitiveRoot {...rest} className={classes}>
      <PrimitiveViewport className={styles.scrollAreaViewportStyle}>
        {children}
      </PrimitiveViewport>

      <PrimitiveScrollbar className={scrollbarClasses} orientation='vertical'>
        <PrimitiveThumb className={scrollAreaScrollbarThumbStyle} />
      </PrimitiveScrollbar>

      <PrimitiveCorner className={styles.scrollAreaScrollbarCornerStyle} />
    </PrimitiveRoot>
  );
};
