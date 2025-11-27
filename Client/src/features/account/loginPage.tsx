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
    Divider
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginUser } from "./accountSlice";
import { Navigate, useLocation, useNavigate, Link } from "react-router";
import { getCart } from "../cart/cartSlice";

export default function LoginPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function submitForm(data: FieldValues) {
        await dispatch(loginUser(data));
        await dispatch(getCart());
        navigate(location.state?.from || "/catalog");
    }

    if(user)
    {
        return <Navigate to={"/catalog"}></Navigate>
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
                        Hesabınıza Giriş Yapın
                    </Typography>
                </Stack>


                {/* Login Form */}
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
                        {...register("password", { 
                            required: { value: true, message: "Parolanızı Giriniz!" }, 
                            minLength: { value: 6, message: "Parolanız 6 karakterden kısa olamaz!" }, 
                            maxLength: 24 
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
                        {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </Button>
                </Box>

                {/* Register Link */}
                <Divider sx={{ my: 4 }} />
                <Typography variant="body1" textAlign="center" color="text.secondary">
                    Hesabınız yok mu?{" "}
                    <Button 
                        component={Link} 
                        to="/register"
                        sx={{ 
                            color: "#D4AF37",
                            fontWeight: 600,
                            textDecoration: "underline",
                            "&:hover": {
                                backgroundColor: "rgba(212, 175, 55, 0.1)"
                            }
                        }}
                    >
                        Kayıt Ol
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}



//Manual method

// const  [values, setValues] = useState({
//     username: "",
//     password: ""
// });

// function handleSubmit(e: any)
// {
//     e.preventDefault();
//     console.log(values);
//     requests.Account.login(values)
// }

// function handleInputChange(e: any)
// {
//     const {name, value} = e.target;
//     setValues({...values, [name]: value});
// }

// return (
//     <Container maxWidth="xs">
//         <Paper sx={{ mt: 8, padding: 2 }} elevation={3}>
//             <Avatar sx={{ mx: "auto", color: "primary.main", textAlign: "center", mb: 1 }}>
//                 <LockOutlined />
//             </Avatar>

//             <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Giriş Yap</Typography>

//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
//                 <TextField name="username"
//                     value={values.username}
//                     onChange={handleInputChange}
//                     label="Kullanıcı Adı"
//                     size="small"
//                     fullWidth
//                     required
//                     autoFocus
//                     sx={{ mb: 2 }} />

//                 <TextField name="password"
//                     value={values.password}
//                     onChange={handleInputChange}
//                     label="Parola"
//                     type="password"
//                     size="small"
//                     fullWidth
//                     required
//                     autoFocus
//                     sx={{ mb: 2 }} />
//                 <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>Giriş Yap</Button>
//             </Box>
//         </Paper>
//     </Container>
// );