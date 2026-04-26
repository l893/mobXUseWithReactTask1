import type { Dispatch, SetStateAction } from 'react';

export type State<TState> = [TState, Dispatch<SetStateAction<TState>>];
