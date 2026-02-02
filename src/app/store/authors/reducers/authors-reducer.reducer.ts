import { createReducer, on } from '@ngrx/store';
import { Authors } from 'src/app/domain/authors.interface';
import * as fromAuthorsActions from '../actions/authors-actions.actions';

export const authorsReducerFeatureKey = 'authorsReducer';

export interface State {
  isLoading: boolean;
  authors: Authors[];
}

export const initialState: State = {
  isLoading: false,
  authors: [],
};

export const reducer = createReducer(
  initialState,
  on(fromAuthorsActions.AuthorsActions.getAuthors, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    fromAuthorsActions.AuthorsActions.getAuthorsSuccess,
    (state, { data }) => ({ ...state, authors: [...data], isLoading: false })
  ),
  on(fromAuthorsActions.AuthorsActions.getAuthorsFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
