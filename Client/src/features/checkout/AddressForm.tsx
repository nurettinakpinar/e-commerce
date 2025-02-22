import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {

    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid2 container spacing={2} mb={4}>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("firstname", { required: { value: true, message: "Adınızı Giriniz!" } })}
                    label="Ad"
                    size="small"
                    fullWidth
                    error={!!errors.firstname}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("lastname", { required: { value: true, message: "Soyadınızı Giriniz!" } })}
                    label="Soyad"
                    size="small"
                    fullWidth
                    error={!!errors.lastname}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("phone", { required: { value: true, message: "Telefon numaranızı Giriniz!" } })}
                    label="Telefon No"
                    size="small"
                    fullWidth
                    error={!!errors.phone}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12 , md: 6}}>
                <TextField {...register("city", { required: { value: true, message: "Şehir Giriniz!" } })}
                    label="Şehir"
                    size="small"
                    fullWidth
                    error={!!errors.city}></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12}} >
                <TextField {...register("addressline", { required: { value: true, message: "Lütfen Geçerli Adres Giriniz!" } })}
                    label="Adres giriniz"
                    size="small"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.addressline}></TextField>
            </Grid2>
        </Grid2>
    );
}