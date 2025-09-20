import { 
    Grid2, 
    TextField, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Stack,
    Alert,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { 
    CreditCard, 
    Security, 
    CalendarMonth,
    Lock
} from "@mui/icons-material";

export default function PaymentForm() {

    const { register, formState: { errors }, watch } = useFormContext();

    // Helper functions for validation
    const validateCardNumber = (value: string) => {
        const cleanValue = value.replace(/\s/g, '');
        if (cleanValue.length < 16) return "Kart numarası 16 haneli olmalıdır";
        if (!/^\d+$/.test(cleanValue)) return "Sadece rakam giriniz";
        return true;
    };

    const validateCVC = (value: string) => {
        if (!/^\d{3,4}$/.test(value)) return "CVC 3-4 haneli olmalıdır";
        return true;
    };

    const validateExpireMonth = (value: string) => {
        const month = parseInt(value);
        if (month < 1 || month > 12) return "Geçerli bir ay giriniz (1-12)";
        return true;
    };

    const validateExpireYear = (value: string) => {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (year < currentYear || year > currentYear + 20) return "Geçerli bir yıl giriniz";
        return true;
    };

    // Format card number with spaces
    const formatCardNumber = (value: string) => {
        return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
    const months = [
        { value: '01', label: '01 - Ocak' },
        { value: '02', label: '02 - Şubat' },
        { value: '03', label: '03 - Mart' },
        { value: '04', label: '04 - Nisan' },
        { value: '05', label: '05 - Mayıs' },
        { value: '06', label: '06 - Haziran' },
        { value: '07', label: '07 - Temmuz' },
        { value: '08', label: '08 - Ağustos' },
        { value: '09', label: '09 - Eylül' },
        { value: '10', label: '10 - Ekim' },
        { value: '11', label: '11 - Kasım' },
        { value: '12', label: '12 - Aralık' }
    ];

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
                <CreditCard sx={{ mr: 2 }} />
                Kredi Kartı Bilgileri
            </Typography>


            <Card variant="outlined" sx={{ mb: 4, border: "2px solid #D4AF37" }}>
                <CardContent sx={{ p: 3 }}>
                    <Grid2 container spacing={3}>
                        {/* Cardholder Name */}
                        <Grid2 size={{ xs: 12 }}>
                            <TextField 
                                {...register("cardname", { 
                                    required: "Kart sahibinin adını giriniz",
                                    minLength: { value: 2, message: "En az 2 karakter olmalıdır" },
                                    pattern: { 
                                        value: /^[a-zA-ZşŞıİçÇğĞüÜöÖ\s]+$/, 
                                        message: "Sadece harf ve boşluk kullanınız" 
                                    }
                                })}
                                label="Kart Sahibinin Adı Soyadı"
                                fullWidth
                                error={!!errors.cardname}
                                helperText={errors.cardname?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreditCard sx={{ color: "#D4AF37" }} />
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

                        {/* Card Number */}
                        <Grid2 size={{ xs: 12 }}>
                            <TextField 
                                {...register("cardnumber", { 
                                    required: "Kart numarasını giriniz",
                                    validate: validateCardNumber
                                })}
                                label="Kart Numarası"
                                fullWidth
                                placeholder="1234 5678 9012 3456"
                                error={!!errors.cardnumber}
                                helperText={errors.cardnumber?.message || "16 haneli kart numaranızı giriniz"}
                                inputProps={{ maxLength: 19 }}
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

                        {/* Expiry Date */}
                        <Grid2 size={{ xs: 6, md: 4 }}>
                            <FormControl fullWidth error={!!errors.cardexpiremonth}>
                                <InputLabel>Son Kullanma Ayı</InputLabel>
                                <Select
                                    {...register("cardexpiremonth", { 
                                        required: "Ay seçiniz",
                                        validate: validateExpireMonth
                                    })}
                                    label="Son Kullanma Ayı"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <CalendarMonth sx={{ color: "#D4AF37", ml: 1 }} />
                                        </InputAdornment>
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#D4AF37",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#D4AF37",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#D4AF37",
                                        },
                                    }}
                                >
                                    {months.map((month) => (
                                        <MenuItem key={month.value} value={month.value}>
                                            {month.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.cardexpiremonth && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                        {errors.cardexpiremonth.message}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid2>

                        <Grid2 size={{ xs: 6, md: 4 }}>
                            <FormControl fullWidth error={!!errors.cardexpireyear}>
                                <InputLabel>Son Kullanma Yılı</InputLabel>
                                <Select
                                    {...register("cardexpireyear", { 
                                        required: "Yıl seçiniz",
                                        validate: validateExpireYear
                                    })}
                                    label="Son Kullanma Yılı"
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#D4AF37",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#D4AF37",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#D4AF37",
                                        },
                                    }}
                                >
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year.toString()}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.cardexpireyear && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                        {errors.cardexpireyear.message}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid2>

                        {/* CVC */}
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <TextField 
                                {...register("cardcvc", { 
                                    required: "Güvenlik kodunu giriniz",
                                    validate: validateCVC
                                })}
                                label="Güvenlik Kodu (CVC)"
                                fullWidth
                                placeholder="123"
                                error={!!errors.cardcvc}
                                helperText={errors.cardcvc?.message || "Kartın arkasındaki 3 haneli kod"}
                                inputProps={{ maxLength: 4 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: "#D4AF37" }} />
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

            {/* Payment Terms - Simplified */}
            <Alert 
                severity="info" 
                sx={{ 
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                    border: "1px solid #2196f3"
                }}
            >
                <Typography variant="body2">
                    <Security sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }} />
                    <strong>Güvenli Ödeme:</strong> Kart bilgileriniz SSL şifreleme ile korunur ve saklanmaz.
                </Typography>
            </Alert>
        </Box>
    );
}