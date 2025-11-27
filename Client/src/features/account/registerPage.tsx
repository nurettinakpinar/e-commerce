import { Diamond } from "@mui/icons-material";
import { 
    Avatar, 
    Box, 
    Button, 
    Container, 
    Paper, 
    TextField, 
    Typography, 
    Stack,
    Alert,
    Divider
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {

    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: ""
        },
        mode: "onTouched"
    });

    async function submitForm(data: FieldValues) {
        await requests.Account.register(data)
            .then(() => {
                toast.success("Hesabınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.");
                navigate("/login");
            })
            .catch(result => {
                const { data: errors } = result;
                if (errors?.array) {
                    errors.array.forEach((error: any) => {
                        if (error.code === "DublicateUserName") {
                            setError("username", { message: "Bu kullanıcı adı zaten kullanılmaktadır. Lütfen farklı bir kullanıcı adı seçiniz." });
                        }
                        if (error.code === "DublicateEmail") {
                            setError("email", { message: "Bu e-posta adresi zaten kullanılmaktadır. Lütfen farklı bir e-posta adresi giriniz." });
                        }
                    });
                } else {
                    toast.error("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
                }
            });
    }

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper 
                elevation={6} 
                sx={{ 
                    p: 6, 
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    border: "2px solid #D4AF37",
                    borderRadius: 3
                }}
            >
                {/* Header */}
                <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <Avatar 
                        sx={{ 
                            width: 80, 
                            height: 80,
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black"
                        }}
                    >
                        <Diamond sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h3" component="h1" sx={{ 
                        fontWeight: 700,
                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        GUL&RA
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ textAlign: "center", fontWeight: 600 }}>
                        Hesap Oluşturun
                    </Typography>
                </Stack>

                {/* Info Alert */}
                <Alert 
                    severity="success" 
                    sx={{ 
                        mb: 4, 
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                        border: "1px solid #4caf50"
                    }}
                >
                    <Typography variant="body2">
                        GUL&RA ailesine katılın ve özel indirimlerden faydalanın!
                    </Typography>
                </Alert>

                {/* Register Form */}
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate>
                    <TextField 
                        {...register("username", { required: { value: true, message: "Kullanıcı Adını Giriniz!" } })}
                        label="Kullanıcı Adı"
                        fullWidth
                        autoFocus
                        sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#D4AF37",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#D4AF37",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#D4AF37",
                            },
                        }}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField 
                        {...register("name", { required: { value: true, message: "Adınızı Giriniz!" } })}
                        label="Ad Soyad"
                        fullWidth
                        sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#D4AF37",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#D4AF37",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#D4AF37",
                            },
                        }}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <TextField 
                        {...register("email", {
                            required: { value: true, message: "E-posta adresinizi giriniz!" },
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Lütfen geçerli bir e-posta adresi giriniz!"
                            }
                        })}
                        label="E-posta Adresi"
                        type="email"
                        fullWidth
                        sx={{ 
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#D4AF37",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#D4AF37",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#D4AF37",
                            },
                        }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField 
                        {...register("password", { 
                            required: { value: true, message: "Parolanızı giriniz!" }, 
                            minLength: { value: 6, message: "Parola en az 6 karakter olmalıdır!" }, 
                            maxLength: { value: 24, message: "Parola en fazla 24 karakter olabilir!" }
                        })}
                        label="Parola"
                        type="password"
                        fullWidth
                        sx={{ 
                            mb: 4,
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "#D4AF37",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#D4AF37",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#D4AF37",
                            },
                        }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button 
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth 
                        sx={{ 
                            py: 2,
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            "&:hover": {
                                background: "linear-gradient(45deg, #B8941F, #E6C200)",
                                transform: "translateY(-2px)",
                                boxShadow: 4
                            },
                            "&:disabled": {
                                background: "rgba(0,0,0,0.12)"
                            },
                            transition: "all 0.3s ease-in-out"
                        }}
                    >
                        {isSubmitting ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
                    </Button>
                </Box>

                {/* Login Link */}
                <Divider sx={{ my: 4 }} />
                <Typography variant="body1" textAlign="center" color="text.secondary">
                    Zaten hesabınız var mı?{" "}
                    <Button 
                        component={Link} 
                        to="/login"
                        sx={{ 
                            color: "#D4AF37",
                            fontWeight: 600,
                            textDecoration: "underline",
                            "&:hover": {
                                backgroundColor: "rgba(212, 175, 55, 0.1)"
                            }
                        }}
                    >
                        Giriş Yap
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}