import { 
    Grid2, 
    TextField, 
    Typography, 
    Box, 
    Card, 
    CardContent,
    InputAdornment,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { 
    Person, 
    Phone, 
    LocationCity, 
    Home,
    LocalShipping
} from "@mui/icons-material";

export default function AddressForm() {

    const { register, formState: { errors } } = useFormContext();

    // Validation functions
    const validatePhone = (value: string) => {
        const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            return "Geçerli bir telefon numarası giriniz (örn: 0505 123 4567)";
        }
        return true;
    };

    const validateName = (value: string) => {
        if (value.length < 2) return "En az 2 karakter olmalıdır";
        if (!/^[a-zA-ZşŞıİçÇğĞüÜöÖ\s]+$/.test(value)) return "Sadece harf ve boşluk kullanınız";
        return true;
    };

    return (
        <Box>
            {/* Header */}
            <Typography variant="h5" sx={{ 
                mb: 3, 
                fontWeight: 700,
                color: "#D4AF37",
                display: "flex",
                alignItems: "center"
            }}>
                <LocalShipping sx={{ mr: 2 }} />
                Teslimat Bilgileri
            </Typography>


            <Card variant="outlined" sx={{ mb: 4, border: "2px solid #D4AF37" }}>
                <CardContent sx={{ p: 3 }}>
                    <Grid2 container spacing={3}>
                        {/* Name Fields */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
<TextField
    {...register("firstname", { 
        required: "Adınızı giriniz",
        validate: validateName
    })}
    label="Ad"
    fullWidth
    error={!!errors.firstname}
    helperText={
        typeof errors.firstname?.message === "string"
            ? errors.firstname.message
            : ""
    }
    InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <Person sx={{ color: "#D4AF37" }} />
            </InputAdornment>
        ),
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#D4AF37",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#D4AF37",
            },
        }
    }}
/>

                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField 
                                {...register("lastname", { 
                                    required: "Soyadınızı giriniz",
                                    validate: validateName
                                })}
                                label="Soyad"
                                fullWidth
                                error={!!errors.lastname}
                                helperText={errors.lastname?.message === "string" ? errors.lastname.message : ""}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "&:hover fieldset": {
                                            borderColor: "#D4AF37",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#D4AF37",
                                        },
                                    }
                                }}
                            />
                        </Grid2>

                        {/* Contact Fields */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                           <TextField
    {...register("phone", { 
        required: "Telefon numaranızı giriniz",
        validate: validatePhone
    })}
    label="Telefon Numarası"
    fullWidth
    placeholder="0505 123 4567"
    error={!!errors.phone}
    helperText={
        typeof errors.phone?.message === "string"
            ? errors.phone.message
            : "Teslimat için gereklidir"
    }
    InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <Phone sx={{ color: "#D4AF37" }} />
            </InputAdornment>
        ),
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#D4AF37",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#D4AF37",
            },
        }
    }}
/>

                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <TextField 
                                {...register("city", { 
                                    required: "Şehir giriniz",
                                    minLength: { value: 2, message: "En az 2 karakter olmalıdır" }
                                })}
                                label="Şehir"
                                fullWidth
                                error={!!errors.city}
                                helperText={errors.city?.message === "string" ? errors.city.message : ""}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationCity sx={{ color: "#D4AF37" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "&:hover fieldset": {
                                            borderColor: "#D4AF37",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#D4AF37",
                                        },
                                    }
                                }}
                            />
                        </Grid2>

                        {/* Address Field */}
                        <Grid2 size={{ xs: 12 }}>
                           <TextField
                                    {...register("addressline", { 
                                        required: "Adres giriniz",
                                        minLength: { value: 10, message: "En az 10 karakter olmalıdır" }
                                    })}
                                    label="Detaylı Adres"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Mahalle, sokak, bina no, daire no gibi detaylı adres bilgilerinizi giriniz"
                                    error={!!errors.addressline}
                                    helperText={
                                        typeof errors.addressline?.message === "string"
                                            ? errors.addressline.message
                                            : "Teslimat için detaylı adres gereklidir"
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                                                <Home sx={{ color: "#D4AF37" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&:hover fieldset": {
                                                borderColor: "#D4AF37",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#D4AF37",
                                            },
                                        }
                                    }}
                                />

                        </Grid2>
                    </Grid2>
                </CardContent>
            </Card>

        </Box>
    );
}