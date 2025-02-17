import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, decrementByAmount, increment, incrementByAmount } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function Counter() {
    const count = useAppSelector((state) => state.counter.value);
    const distpatch = useAppDispatch();
    return (
        <>
            <Typography>{count}</Typography>
            <ButtonGroup>
                <Button onClick={() => distpatch(increment())}>increment</Button>
                <Button onClick={() => distpatch(decrement())}>decrement</Button>
                <Button onClick={() => distpatch(incrementByAmount(5))}>incrementByAmount</Button>
                <Button onClick={() => distpatch(decrementByAmount(5))}>decrementByAmount</Button>
            </ButtonGroup>
        </>
    )
}