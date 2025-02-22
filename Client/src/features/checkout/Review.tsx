import { DeliveryDining, Payments } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Review() {

    const { getValues } = useFormContext();

    return (
        <Stack spacing={2} sx={{ my: 4 }}>
            <Stack direction="column" spacing={2} divider={<Divider />} sx={{ my: 2 }}>
                <div>
                    <Typography variant="subtitle2" gutterBottom sx={{display: "flex", alignItems: "center"}}>
                        <DeliveryDining sx={{mr:2}}/>
                        Teslimat Bilgileri</Typography>
                    <Typography sx={{color:"text.secondary"}} gutterBottom>{getValues("firstname")} {getValues("lastname")}</Typography>
                    <Typography sx={{color:"text.secondary"}} gutterBottom>{getValues("phone")}</Typography>
                    <Typography sx={{color:"text.secondary"}} gutterBottom>{getValues("addressline")} / {getValues("city")}</Typography>
                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom sx={{display: "flex", alignItems: "center"}}>
                        <Payments sx={{mr:2}}/>
                        Ödeme Bilgileri</Typography>
                    <Typography sx={{color:"text.secondary"}} gutterBottom>{getValues("card_name")}</Typography>
                    <Typography sx={{color:"text.secondary"}} gutterBottom>{getValues("card_number")}</Typography>
                    <Typography sx={{color:"text.secondary"}} gutterBottom>{getValues("card_cvv")} - {getValues("card_expire_date")} </Typography>
                </div>
            </Stack>


        </Stack>
    );
}