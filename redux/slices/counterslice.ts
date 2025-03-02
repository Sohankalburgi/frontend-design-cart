import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    count: number;
    productId: string;
}

const initialState: CounterState = {
    count: 0,
    productId: '',
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        setProductId: (state, action: PayloadAction<string>) => {
            state.productId = action.payload;
        },
    },
});

export const { setCount, setProductId } = counterSlice.actions;
export default counterSlice.reducer;

