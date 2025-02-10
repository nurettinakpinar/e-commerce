import { Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function NotFound() {
    return (
        <Container
            component={Card}
            sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh", // Full screen height to center vertically
                textAlign: "center", // Center text alignment
            }}
        >
            <Typography variant="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" gutterBottom>
               Sayfa Bulunamadı
            </Typography>
            <Typography variant="h6" marginBottom={10}>
                Tarayıcınız üzerinden geri gidebilir ya da alışverişe devam edebilirsiniz.
            </Typography>
            <Divider sx={{ width: "100%", mb: 10 }} />
            <Button
                variant="contained"
                component={NavLink}
                to="/catalog"
                sx={{ mt: 2 }}
            >
                Alışverişe Devam Et
            </Button>
        </Container>
    );
}
