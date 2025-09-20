import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Switch,
    FormControlLabel,
    Chip,
    IconButton
} from "@mui/material";
import { Add, Edit, Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import requests from "../../../api/requests";

interface Category {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
}

const emptyCategory: Category = {
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 0,
    createdAt: ""
};

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<Category>(emptyCategory);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const data = await requests.Category.listAll();
            setCategories(data);
        } catch (error) {
            console.error("Kategoriler yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleOpen(category?: Category) {
        setForm(category ? { ...category } : emptyCategory);
        setOpen(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'sortOrder' ? Number(value) : value)
        }));
    }

    async function handleSave() {
        try {
            if (form.id) {
                await requests.Category.update(form.id, form);
            } else {
                await requests.Category.create(form);
            }
            setOpen(false);
            await loadCategories();
        } catch (error) {
            console.error("Kategori kaydedilemedi:", error);
        }
    }

    async function handleDelete(id: number) {
        if (window.confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) {
            try {
                await requests.Category.delete(id);
                await loadCategories();
            } catch (error) {
                console.error("Kategori silinemedi:", error);
                alert("Bu kategoriye ait ürünler bulunmaktadır. Önce ürünleri başka kategoriye taşıyın.");
            }
        }
    }

    if (loading) {
        return <Typography>Kategoriler yükleniyor...</Typography>;
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Kategori Yönetimi
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpen()}
                    sx={{
                        background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                        color: "black"
                    }}
                >
                    Yeni Kategori
                </Button>
            </Stack>

            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Ad</TableCell>
                            <TableCell>Açıklama</TableCell>
                            <TableCell>Sıra</TableCell>
                            <TableCell>Durum</TableCell>
                            <TableCell>Oluşturma</TableCell>
                            <TableCell align="right">İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id} hover>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {category.isActive ? 
                                            <Visibility sx={{ color: "success.main", fontSize: 20 }} /> : 
                                            <VisibilityOff sx={{ color: "text.secondary", fontSize: 20 }} />
                                        }
                                        <span>{category.name}</span>
                                    </Stack>
                                </TableCell>
                                <TableCell>{category.description || "-"}</TableCell>
                                <TableCell>{category.sortOrder}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={category.isActive ? "Aktif" : "Pasif"}
                                        color={category.isActive ? "success" : "default"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(category.createdAt).toLocaleDateString('tr-TR')}
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleOpen(category)}
                                            sx={{ color: "primary.main" }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(category.id)}
                                            sx={{ color: "error.main" }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Category Form Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {form.id ? 'Kategori Düzenle' : 'Yeni Kategori'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Kategori Adı"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        
                        <TextField
                            label="Açıklama"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />
                        
                        <TextField
                            label="Resim URL"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            fullWidth
                        />
                        
                        <TextField
                            label="Sıra Numarası"
                            name="sortOrder"
                            type="number"
                            value={form.sortOrder}
                            onChange={handleChange}
                            fullWidth
                        />
                        
                        <FormControlLabel
                            control={
                                <Switch
                                    name="isActive"
                                    checked={form.isActive}
                                    onChange={handleChange}
                                />
                            }
                            label="Aktif"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Vazgeç
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSave}
                        sx={{
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black"
                        }}
                    >
                        Kaydet
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
