import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid2,
    TextField,
    Button,
    Stack,
    Card,
    CardContent,
    Tabs,
    Tab,
    Alert,
    Divider
} from "@mui/material";
import { Save, Search, Share, Language } from "@mui/icons-material";
import requests from "../../../api/requests";

interface SeoSetting {
    id?: number;
    pageKey: string;
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    updatedAt?: string;
}

const seoPages = [
    { key: "home", label: "Ana Sayfa" },
    { key: "about", label: "Hakkımızda" },
    { key: "contact", label: "İletişim" },
    { key: "products", label: "Ürünler" }
];

export default function AdminSeo() {
    const [currentTab, setCurrentTab] = useState(0);
    const [seoData, setSeoData] = useState<{ [key: string]: SeoSetting }>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadAllSeoData();
    }, []);

    async function loadAllSeoData() {
        try {
            const promises = seoPages.map(page => 
                requests.Seo.get(page.key).catch(() => ({
                    pageKey: page.key,
                    title: "",
                    description: "",
                    keywords: "",
                    ogTitle: "",
                    ogDescription: "",
                    ogImage: ""
                }))
            );
            
            const results = await Promise.all(promises);
            const seoMap: { [key: string]: SeoSetting } = {};
            
            results.forEach((result, index) => {
                seoMap[seoPages[index].key] = result;
            });
            
            setSeoData(seoMap);
        } catch (error) {
            console.error("SEO verileri yüklenemedi:", error);
        }
    }

    function handleChange(pageKey: string, field: string, value: string) {
        setSeoData(prev => ({
            ...prev,
            [pageKey]: {
                ...prev[pageKey],
                [field]: value
            }
        }));
    }

    async function handleSave(pageKey: string) {
        try {
            setSaving(true);
            await requests.Seo.update(pageKey, seoData[pageKey]);
            setMessage(`${seoPages.find(p => p.key === pageKey)?.label} SEO ayarları kaydedildi!`);
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Kaydetme hatası!");
            console.error("SEO kaydetme hatası:", error);
        } finally {
            setSaving(false);
        }
    }

    const currentPage = seoPages[currentTab];
    const currentSeo = seoData[currentPage?.key] || {};

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                SEO Yönetimi
            </Typography>

            {message && (
                <Alert 
                    severity={message.includes("kaydedildi") ? "success" : "error"} 
                    sx={{ mb: 3 }}
                >
                    {message}
                </Alert>
            )}

            <Paper elevation={3} sx={{ mb: 3 }}>
                <Tabs 
                    value={currentTab} 
                    onChange={(_, newValue) => setCurrentTab(newValue)}
                    variant="fullWidth"
                >
                    {seoPages.map((page) => (
                        <Tab key={page.key} label={page.label} />
                    ))}
                </Tabs>
            </Paper>

            {currentPage && (
                <Grid2 container spacing={3}>
                    {/* Basic SEO */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                                    <Search sx={{ mr: 1, color: "#D4AF37" }} />
                                    Temel SEO
                                </Typography>
                                
                                <Stack spacing={3}>
                                    <TextField
                                        label="Sayfa Başlığı (Title)"
                                        value={currentSeo.title || ""}
                                        onChange={(e) => handleChange(currentPage.key, "title", e.target.value)}
                                        fullWidth
                                        helperText="60-70 karakter arası önerilir"
                                    />
                                    
                                    <TextField
                                        label="Meta Açıklama (Description)"
                                        value={currentSeo.description || ""}
                                        onChange={(e) => handleChange(currentPage.key, "description", e.target.value)}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        helperText="150-160 karakter arası önerilir"
                                    />
                                    
                                    <TextField
                                        label="Anahtar Kelimeler (Keywords)"
                                        value={currentSeo.keywords || ""}
                                        onChange={(e) => handleChange(currentPage.key, "keywords", e.target.value)}
                                        fullWidth
                                        helperText="Virgülle ayrılmış anahtar kelimeler"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>

                    {/* Open Graph (Social Media) */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                                    <Share sx={{ mr: 1, color: "#D4AF37" }} />
                                    Sosyal Medya (Open Graph)
                                </Typography>
                                
                                <Stack spacing={3}>
                                    <TextField
                                        label="OG Başlık"
                                        value={currentSeo.ogTitle || ""}
                                        onChange={(e) => handleChange(currentPage.key, "ogTitle", e.target.value)}
                                        fullWidth
                                        helperText="Facebook, Twitter paylaşımları için"
                                    />
                                    
                                    <TextField
                                        label="OG Açıklama"
                                        value={currentSeo.ogDescription || ""}
                                        onChange={(e) => handleChange(currentPage.key, "ogDescription", e.target.value)}
                                        fullWidth
                                        multiline
                                        rows={2}
                                        helperText="Sosyal medya paylaşım açıklaması"
                                    />
                                    
                                    <TextField
                                        label="OG Resim URL"
                                        value={currentSeo.ogImage || ""}
                                        onChange={(e) => handleChange(currentPage.key, "ogImage", e.target.value)}
                                        fullWidth
                                        helperText="1200x630 px önerilir"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>

                    {/* Preview */}
                    <Grid2 size={12}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                                    <Language sx={{ mr: 1, color: "#D4AF37" }} />
                                    Google Arama Önizlemesi
                                </Typography>
                                
                                <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 1, mb: 3 }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            color: "#1a0dab", 
                                            fontSize: "20px",
                                            fontWeight: 400,
                                            mb: 1,
                                            cursor: "pointer",
                                            "&:hover": { textDecoration: "underline" }
                                        }}
                                    >
                                        {currentSeo.title || `${currentPage.label} - GUL&RA Kuyumcu`}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#006621", mb: 1 }}>
                                        https://gulra.com.tr/{currentPage.key === "home" ? "" : currentPage.key}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#545454", lineHeight: 1.4 }}>
                                        {currentSeo.description || "Premium mücevher ve kuyumculuk hizmetleri"}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={() => handleSave(currentPage.key)}
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
                                        Son güncelleme: {currentSeo.updatedAt ? new Date(currentSeo.updatedAt).toLocaleString('tr-TR') : 'Henüz güncellenmedi'}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            )}
        </Box>
    );
}
