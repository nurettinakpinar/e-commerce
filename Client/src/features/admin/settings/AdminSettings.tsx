import {
    Box,
    Typography,
    Paper,
    Grid2,
    Card,
    CardContent,
    Stack,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Divider,
    Alert
} from "@mui/material";
import { Save, Backup, Security } from "@mui/icons-material";

export default function AdminSettings() {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Sistem Ayarları
            </Typography>

            <Grid2 container spacing={3}>
                {/* General Settings */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                                <Security sx={{ mr: 1, color: "#D4AF37" }} />
                                Genel Ayarlar
                            </Typography>
                            
                            <Stack spacing={3}>
                                <TextField
                                    label="Site Başlığı"
                                    defaultValue="GUL&RA Kuyumcu"
                                    fullWidth
                                />
                                
                                <TextField
                                    label="Site Açıklaması"
                                    defaultValue="Premium mücevher ve kuyumculuk hizmetleri"
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                                
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Yeni kullanıcı kayıtlarını aktif et"
                                />
                                
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="E-posta bildirimlerini aktif et"
                                />
                                
                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    sx={{
                                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                        color: "black"
                                    }}
                                >
                                    Kaydet
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* E-commerce Settings */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                E-ticaret Ayarları
                            </Typography>
                            
                            <Stack spacing={3}>
                                <TextField
                                    label="Para Birimi"
                                    defaultValue="TRY"
                                    fullWidth
                                />
                                
                                <TextField
                                    label="Minimum Sipariş Tutarı"
                                    defaultValue="100"
                                    type="number"
                                    fullWidth
                                />
                                
                                <TextField
                                    label="Ücretsiz Kargo Limiti"
                                    defaultValue="500"
                                    type="number"
                                    fullWidth
                                />
                                
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Stok takibini aktif et"
                                />
                                
                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    sx={{
                                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                                        color: "black"
                                    }}
                                >
                                    Kaydet
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* System Maintenance */}
                <Grid2 size={12}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                                <Backup sx={{ mr: 1, color: "#D4AF37" }} />
                                Sistem Bakımı
                            </Typography>
                            
                            <Alert severity="warning" sx={{ mb: 3 }}>
                                <strong>Dikkat:</strong> Bu işlemler sistem performansını etkileyebilir.
                            </Alert>
                            
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button variant="outlined" startIcon={<Backup />}>
                                    Veritabanı Yedeği Al
                                </Button>
                                
                                <Button variant="outlined" color="warning">
                                    Cache Temizle
                                </Button>
                                
                                <Button variant="outlined" color="info">
                                    Log Dosyalarını Temizle
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Box>
    );
}
