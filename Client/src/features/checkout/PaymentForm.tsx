import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {

    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid2 container spacing={2} mb={4}>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("card_name", { required: { value: true, message: "Kartın üstündeki ismi Giriniz!" } })}
                    label="Kart üstündeki İsim"
                    size="small"
                    fullWidth
                    error={!!errors.card_name}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("card_number", { required: { value: true, message: "Kart numarasını Giriniz!" } })}
                    label="Kart Numarası"
                    size="small"
                    fullWidth
                    error={!!errors.card_number}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("card_expire_date", { required: { value: true, message: "Kart son kullanma tarihi Giriniz!" } })}
                    label="Son kullanma tarihi"
                    size="small"
                    fullWidth
                    error={!!errors.card_expire_date}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("card_cvv", { required: { value: true, message: "Kartın Arkasındaki 3 haneli güvenlik kodunu Giriniz!" } })}
                    label="Güvenlik Kodu"
                    size="small"
                    fullWidth
                    error={!!errors.card_cvv}></TextField>
            </Grid2>
       
        </Grid2>
    );
}