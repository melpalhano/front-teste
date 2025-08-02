import { RecipeVariants } from '@vanilla-extract/recipes';
import { HTMLAttributes } from 'react';

import * as constants from './constants';
import { highlightRootRecipe } from './styles/highlight-root-recipe.css';

export type HighlightTemplateStatus =
  (typeof constants.HIGHLIGHT_STATUS)[number];

export type HighlightRootVariants = RecipeVariants<typeof highlightRootRecipe>;

export type HighlightRootProps = HTMLAttributes<HTMLDivElement> &
  HighlightRootVariants & {
    asChild?: boolean;
  };

export type HighlightItemProps = HTMLAttributes<HTMLDivElement>;

export type HighlightTextProps = HTMLAttributes<HTMLParagraphElement> & {
  asChild?: boolean;
};
