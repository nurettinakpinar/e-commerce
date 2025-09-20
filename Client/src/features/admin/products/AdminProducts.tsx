import { useEffect, useState } from "react";
import { IProduct } from "../../../models/IProduct";
import requests from "../../../api/requests";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, MenuItem, Chip } from "@mui/material";

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

    async function load() {
        const [productsData, categoriesData] = await Promise.all([
            requests.Catalog.list(),
            requests.Category.list()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
    }

    useEffect(() => { load(); }, []);

    function handleOpen(p?: IProduct) {
        setForm(p ? { ...p } : emptyProduct);
        setOpen(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ 
            ...prev, 
            [name]: name === 'price' || name === 'stock' || name === 'categoryId' ? Number(value) || null : value 
        } as any));
    }

    async function handleSave() {
        if (form.id) {
            await requests.Catalog.update(form.id, form);
        } else {
            await requests.Catalog.create(form);
        }
        setOpen(false);
        await load();
    }

    async function handleDelete(id: number) {
        await requests.Catalog.delete(id);
        await load();
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">Ürünler</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>Yeni Ürün</Button>
            </Stack>

            <Table size="small">
                <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Ad</TableCell>
                            <TableCell>Kategori</TableCell>
                            <TableCell>Fiyat</TableCell>
                            <TableCell>Stok</TableCell>
                            <TableCell>Durum</TableCell>
                            <TableCell align="right">İşlemler</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(p => (
                        <TableRow key={p.id} hover>
                            <TableCell>{p.id}</TableCell>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>
                                {p.category ? (
                                    <Chip label={p.category.name} size="small" />
                                ) : (
                                    <Typography variant="body2" color="text.secondary">-</Typography>
                                )}
                            </TableCell>
                            <TableCell>₺{p.price.toLocaleString()}</TableCell>
                            <TableCell>{p.stock}</TableCell>
                            <TableCell>{p.isActive ? 'Aktif' : 'Pasif'}</TableCell>
                            <TableCell align="right">
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Button size="small" onClick={() => handleOpen(p)}>Düzenle</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(p.id)}>Sil</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{form.id ? 'Ürün Düzenle' : 'Yeni Ürün'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField label="Ad" name="name" value={form.name} onChange={handleChange} fullWidth />
                        <TextField label="Açıklama" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
                        <TextField 
                            label="Kategori" 
                            name="categoryId" 
                            select 
                            value={form.categoryId || ""} 
                            onChange={handleChange} 
                            fullWidth
                        >
                            <MenuItem value="">Kategori Seçiniz</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField label="Resim" name="imageUrl" value={form.imageUrl} onChange={handleChange} fullWidth />
                        <TextField label="Fiyat" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
                        <TextField label="Stok" name="stock" type="number" value={form.stock} onChange={handleChange} fullWidth />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Vazgeç</Button>
                    <Button variant="contained" onClick={handleSave}>Kaydet</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}


