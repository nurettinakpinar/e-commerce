import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginUser } from "./accountSlice";
import { Navigate, useLocation, useNavigate } from "react-router";
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
        <Container maxWidth="xs">
            <Paper sx={{ mt: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "primary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Giriş Yap</Typography>

                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField {...register("username", { required: { value: true, message: "Kullanıcı Adını Giriniz!" } })}
                        label="Kullanıcı Adı"
                        size="small"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        error={!!errors.username}
                        helperText={errors.username?.message}></TextField>
                    <TextField {...register("password", { required: { value: true, message: "Parolanızı Giriniz!" }, minLength: { value: 6, message: "Parolanız 6 karakterden kısa olamaz!" }, maxLength: 24 })}
                        label="Parola"
                        type="password"
                        size="small"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        error={!!errors.password}
                        helperText={errors.password?.message}></TextField>
                    <Button loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        fullWidth sx={{ mt: 1 }} >Giriş Yap</Button>
                </Box>
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