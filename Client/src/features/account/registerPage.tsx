import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
                toast.success("kullanıcı oluşturuldu.");
                navigate("/login");
            })
            .catch(result => {
                const { data: errors } = result;
                errors.array.forEach((error: any) => {
                    if (error.code == "DublicateUserName") {
                        setError("username", { message: "Kullanıcı adı kullanılmaktadır. Lütfen başka bir kullanıcı adı giriniz." });
                    }
                    if (error.code == "DublicateEmail") {
                        setError("username", { message: "E-posta kullanılmaktadır. Lütfen başka bir E-posta giriniz." });
                    }

                });
            });

    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{ mt: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "primary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Kayıt Ol</Typography>

                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField {...register("username", { required: { value: true, message: "Kullanıcı Adını Giriniz!" } })}
                        label="Kullanıcı Adı"
                        size="small"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        error={!!errors.username}
                        helperText={errors.username?.message}></TextField>

                    <TextField {...register("name", { required: { value: true, message: "Adınızı Giriniz!" } })}
                        label="Adınız"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={!!errors.name}
                        helperText={errors.name?.message}></TextField>

                    <TextField {...register("email", {
                        required: { value: true, message: "Geçerli bir E-posta adresi Giriniz!" },
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Lütfen geçerli bir e-posta adresi giriniz!"
                        }
                    })}
                        label="E-posta Adresi"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={!!errors.email}
                        helperText={errors.email?.message}></TextField>

                    <TextField {...register("password", { required: { value: true, message: "Parolanızı Giriniz!" }, minLength: { value: 6, message: "Parolanız 6 karakterden kısa olamaz!" }, maxLength: 24 })}
                        label="Parola"
                        type="password"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={!!errors.password}
                        helperText={errors.password?.message}></TextField>

                    <Button loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        fullWidth sx={{ mt: 1 }} >Kayıt Ol</Button>
                </Box>
            </Paper>
        </Container>
    );
}