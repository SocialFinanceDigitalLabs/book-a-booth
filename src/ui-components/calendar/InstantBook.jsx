import React, {useCallback, useState} from "react";
import Button from "@mui/material/Button";

const InstantBook = ({bookClick}) => {
    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const book = useCallback(async (duration) => {
        setEnabled(false);
        await bookClick(Math.floor(Date.now() / 1000), duration)
        setOpen(false);
        setEnabled(true);
    }, [bookClick])

    return  <>
        {open &&
            <div>
            <Button disabled={!enabled} variant="outlined" color="secondary" onClick={() => setOpen(false)}>Dismiss</Button>
            <Button disabled={!enabled} variant="outlined" onClick={() => book(30)}>30 min</Button>
            <Button disabled={!enabled} variant="outlined" onClick={() => book(60)}>60 min</Button>
            <Button disabled={!enabled} variant="outlined" onClick={() => book(90)}>90 min</Button>
            <Button disabled={!enabled} variant="outlined" onClick={() => book(120)}>120 min</Button>
            </div>
        }
        {!open &&
        <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Instant Book</Button>
        }
    </>

}
export default InstantBook;