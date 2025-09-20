import { useEffect, useState } from "react";
import { 
    Box, 
    Button, 
    Stack, 
    TextField, 
    Typography, 
    Paper,
    Alert,
    LinearProgress
} from "@mui/material";
import { Save, Refresh } from "@mui/icons-material";
import requests from "../../../api/requests";

export default function EditContact() {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    async function load() {
        try {
            setLoading(true);
            const data = await requests.Content.get("contact");
            setValue(data.value);
        } catch (error) {
            setMessage("İçerik yüklenemedi.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function save() {
        try {
            setSaving(true);
            await requests.Content.update("contact", value);
            setMessage("İçerik başarıyla kaydedildi!");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Kaydetme hatası!");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <Box>
                <Typography variant="h5" sx={{ mb: 2 }}>İletişim İçeriği Yükleniyor...</Typography>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    İletişim İçeriği
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={load}
                    disabled={loading}
                >
                    Yenile
                </Button>
            </Stack>

            {message && (
                <Alert 
                    severity={message.includes("başarı") ? "success" : "error"} 
                    sx={{ mb: 2 }}
                >
                    {message}
                </Alert>
            )}

            <Paper elevation={3} sx={{ p: 3 }}>
                <Stack spacing={3}>
                    <Typography variant="body2" color="text.secondary">
                        Bu içerik "İletişim" sayfasının ana bölümünde görüntülenecektir.
                    </Typography>
                    
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        multiline
                        rows={12}
                        placeholder="İletişim içeriğini buraya yazın..."
                        variant="outlined"
                        fullWidth
                    />
                    
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={save}
                            disabled={saving}
                            sx={{
                                background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                color: "black",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #B8941F, #E6C200)"
                                }
                            }}
                        >
                            {saving ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "center" }}>
                            {value.length} karakter
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}


