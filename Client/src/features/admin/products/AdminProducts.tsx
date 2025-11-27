import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    MenuItem,
    Chip,
    Paper,
    Grid2,
    Card,
    IconButton,
    FormControlLabel,
    Switch,
    ImageList,
    ImageListItem,
    ImageListItemBar
} from "@mui/material";
import {
    Add,
    Edit,
    Delete,
    PhotoCamera,
    Close,
    Inventory,
    AttachMoney,
    Category,
    Image,
    CloudUpload
} from "@mui/icons-material";
import { IProduct } from "../../../models/IProduct";
import requests from "../../../api/requests";

const emptyProduct: IProduct = {
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    isActive: true,
    stock: 0,
    categoryId: null
}

interface Category {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<IProduct>(emptyProduct);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    async function load() {
        setLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                requests.Catalog.list(),
                requests.Category.list()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    function handleOpen(p?: IProduct) {
        setForm(p ? { ...p } : emptyProduct);
        // Load multiple images if available, otherwise use single image
        if (p?.imageUrls) {
            try {
                const imageArray = JSON.parse(p.imageUrls);
                setImages(Array.isArray(imageArray) ? imageArray : [p.imageUrl || ""]);
            } catch {
                setImages(p?.imageUrl ? [p.imageUrl] : []);
            }
        } else {
            setImages(p?.imageUrl ? [p.imageUrl] : []);
        }
        setOpen(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ 
            ...prev, 
            [name]: name === 'price' || name === 'stock' || name === 'categoryId' ? Number(value) || null : value 
        } as any));
    }

    function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: checked }));
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        
        if (images.length + files.length > 5) {
            alert("Maksimum 5 fotoğraf yükleyebilirsiniz.");
            return;
        }

        setLoading(true);
        
        try {
            for (const file of files) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    alert(`${file.name} dosyası çok büyük. Maksimum 5MB olmalıdır.`);
                    continue;
                }

                // Upload file to server
                const response = await requests.Catalog.uploadImage(file);
                
                // Add the uploaded filename to images
                setImages(prev => [...prev, response.fileName]);
            }
        } catch (error: any) {
            console.error("Error uploading images:", error);
            alert("Fotoğraf yüklenirken hata oluştu: " + (error.response?.data || error.message));
        } finally {
            setLoading(false);
            // Reset input
            e.target.value = '';
        }
    }

    function removeImage(index: number) {
        setImages(prev => prev.filter((_, i) => i !== index));
    }

    async function handleSave() {
        if (!form.name || !form.price) {
            alert("Ürün adı ve fiyat zorunludur.");
            return;
        }

        setLoading(true);
        try {
            // Use the first image as the main image, save all images as JSON
            const productData = {
                ...form,
                imageUrl: images[0] || form.imageUrl || "",
                imageUrls: JSON.stringify(images) // Save all images as JSON array
            };

            if (form.id) {
                await requests.Catalog.update(form.id, productData);
            } else {
                await requests.Catalog.create(productData);
            }
            setOpen(false);
            await load();
            alert("Ürün başarıyla kaydedildi!");
        } catch (error: any) {
            console.error("Error saving product:", error);
            alert("Ürün kaydedilirken hata oluştu: " + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
            return;
        }
        
        setLoading(true);
        try {
            await requests.Catalog.delete(id);
            await load();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Ürün silinirken hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box>
            {/* Header */}
            <Paper elevation={3} sx={{ p: 3, mb: 3, background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)", color: "white" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            <Inventory sx={{ mr: 2, verticalAlign: "middle" }} />
                            Ürün Yönetimi
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            Ürünlerinizi ekleyin, düzenleyin ve yönetin
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => handleOpen()}
                        size="large"
                        sx={{
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            fontWeight: 600,
                            "&:hover": {
                                background: "linear-gradient(45deg, #B8941F, #E6C200)"
                            }
                        }}
                    >
                        Yeni Ürün Ekle
                    </Button>
                </Stack>
            </Paper>

            {/* Products Table */}
            <Paper elevation={3}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Ürün</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Kategori</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Fiyat</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Stok</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(p => (
                            <TableRow key={p.id} hover sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 2,
                                                overflow: "hidden",
                                                backgroundColor: "#f0f0f0",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            {p.imageUrl ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/images/${p.imageUrl}`}
                                                    alt={p.name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <Image sx={{ color: "#ccc" }} />
                                            )}
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {p.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>
                                                {p.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    {p.category ? (
                                        <Chip 
                                            label={p.category.name} 
                                            size="small" 
                                            sx={{ backgroundColor: "#D4AF37", color: "black" }}
                                        />
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">-</Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                                        ₺{p.price.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={`${p.stock} adet`} 
                                        size="small" 
                                        color={(p.stock ?? 0) > 10 ? "success" : (p.stock ?? 0)> 0 ? "warning" : "error"}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={p.isActive ? 'Aktif' : 'Pasif'} 
                                        size="small"
                                        color={p.isActive ? "success" : "default"}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleOpen(p)}
                                            sx={{ color: "#D4AF37" }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleDelete(p.id)}
                                            sx={{ color: "#f44336" }}
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

            {/* Product Form Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ 
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)", 
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {form.id ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
                    </Typography>
                    <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Grid2 container spacing={3}>
                        {/* Product Images */}
                        <Grid2 size={12}>
                            <Card variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                                    <PhotoCamera sx={{ mr: 1 }} />
                                    Ürün Fotoğrafları (Maksimum 5)
                                </Typography>
                                
                                {/* Image Upload Button */}
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<CloudUpload />}
                                    sx={{ mb: 2 }}
                                    disabled={images.length >= 5}
                                >
                                    Fotoğraf Seç
                                    <input
                                        type="file"
                                        hidden
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                                
                                {/* Image Preview */}
                                {images.length > 0 && (
                                    <ImageList cols={3} gap={8}>
                                        {images.map((image, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/images/${image}`}
                                                    alt={`Ürün fotoğrafı ${index + 1}`}
                                                    loading="lazy"
                                                    style={{ borderRadius: 8, height: 120, objectFit: 'cover' }}
                                                />
                                                <ImageListItemBar
                                                    actionIcon={
                                                        <IconButton
                                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                            onClick={() => removeImage(index)}
                                                        >
                                                            <Close />
                                                        </IconButton>
                                                    }
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                )}
                            </Card>
                        </Grid2>

                        {/* Product Information */}
                        <Grid2 size={{ xs: 12, md: 8 }}>
                            <Stack spacing={3}>
                                <TextField 
                                    label="Ürün Adı" 
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
                                    rows={4}
                                />
                                
                                <TextField 
                                    label="Kategori" 
                                    name="categoryId" 
                                    select 
                                    value={form.categoryId || ""} 
                                    onChange={handleChange} 
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="">Kategori Seçiniz</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Grid2>

                        {/* Price and Stock */}
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Stack spacing={3}>
                                <TextField 
                                    label="Fiyat (₺)" 
                                    name="price" 
                                    type="number" 
                                    value={form.price} 
                                    onChange={handleChange} 
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: <AttachMoney sx={{ color: "#D4AF37" }} />
                                    }}
                                />
                                
                                <TextField 
                                    label="Stok Miktarı" 
                                    name="stock" 
                                    type="number" 
                                    value={form.stock} 
                                    onChange={handleChange} 
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: <Inventory sx={{ color: "#D4AF37" }} />
                                    }}
                                />
                                
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={!!form.isActive}
                                            onChange={handleSwitchChange}
                                            name="isActive"
                                            color="warning"
                                        />
                                    }
                                    label="Ürün Aktif"
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: "1px solid #e0e0e0" }}>
                    <Button onClick={() => setOpen(false)} size="large">
                        Vazgeç
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSave}
                        disabled={loading || !form.name || !form.price}
                        size="large"
                        sx={{
                            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
                            color: "black",
                            fontWeight: 600,
                            "&:hover": {
                                background: "linear-gradient(45deg, #B8941F, #E6C200)"
                            }
                        }}
                    >
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}