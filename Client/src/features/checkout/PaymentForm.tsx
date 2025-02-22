import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {

    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid2 container spacing={2} mb={4}>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField {...register("cardname", { required: { value: true, message: "Kartın üstündeki ismi Giriniz!" } })}
                    label="Kart üstündeki İsim"
                    size="small"
                    fullWidth
                    error={!!errors.card_name}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField {...register("cardnumber", { required: { value: true, message: "Kart numarasını Giriniz!" } })}
                    label="Kart Numarası"
                    size="small"
                    fullWidth
                    error={!!errors.card_number}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 4 }}>
                <TextField {...register("cardexpiremonth", { required: { value: true, message: "Geçerli bir ay giriniz!" } })}
                    label="Ay"
                    size="small"
                    fullWidth
                    error={!!errors.card_expire_date}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 4 }}>
                <TextField {...register("cardexpireyear", { required: { value: true, message: "Geçerli bir yıl giriniz!" } })}
                    label="Yıl"
                    size="small"
                    fullWidth
                    error={!!errors.card_expire_date}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
                <TextField {...register("cardcvc", { required: { value: true, message: "Kartın Arkasındaki 3 haneli güvenlik kodunu Giriniz!" } })}
                    label="Güvenlik Kodu"
                    size="small"
                    fullWidth
                    error={!!errors.card_cvv}></TextField>
            </Grid2>

        </Grid2>
    );
}