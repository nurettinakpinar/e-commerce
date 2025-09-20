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
    Chip,
    Button,
    Stack,
    Alert
} from "@mui/material";
import { Person, AdminPanelSettings } from "@mui/icons-material";
import requests from "../../../api/requests";

interface AdminUser {
    id: string;
    name?: string;
    email?: string;
    roles: string[];
    createdAt: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await requests.Admin.users();
                setUsers(data);
            } catch (err: any) {
                setError("Kullanıcılar yüklenemedi");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    function getRoleColor(role: string) {
        switch (role) {
            case 'Admin': return 'error';
            case 'Customer': return 'primary';
            default: return 'default';
        }
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Kullanıcı Yönetimi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Toplam {users.length} kullanıcı
                </Typography>
            </Stack>

            {loading && (
                <Alert severity="info" sx={{ mb: 3 }}>
                    Kullanıcılar yükleniyor...
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Ad</TableCell>
                            <TableCell>E-posta</TableCell>
                            <TableCell>Roller</TableCell>
                            <TableCell>Kayıt Tarihi</TableCell>
                            <TableCell align="right">İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {user.roles.includes('Admin') ? 
                                            <AdminPanelSettings sx={{ color: "#D4AF37", fontSize: 20 }} /> : 
                                            <Person sx={{ color: "text.secondary", fontSize: 20 }} />
                                        }
                                        <span>{user.name}</span>
                                    </Stack>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        {user.roles.map((role) => (
                                            <Chip
                                                key={role}
                                                label={role}
                                                color={getRoleColor(role) as any}
                                                size="small"
                                            />
                                        ))}
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button 
                                            size="small"
                                            onClick={async () => {
                                                const nextRoles = user.roles.includes("Admin") ? ["Customer"] : ["Customer","Admin"];
                                                await requests.Admin.updateRoles(user.id, nextRoles);
                                                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, roles: nextRoles } : u));
                                            }}
                                        >
                                            {user.roles.includes("Admin") ? "Admin'i Kaldır" : "Admin Yap"}
                                        </Button>
                                        <Button 
                                            size="small" 
                                            color={user.isLocked ? "success" as any : "error" as any}
                                            onClick={async () => {
                                                if (user.isLocked) {
                                                    await requests.Admin.unblock(user.id);
                                                    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isLocked: false } : u));
                                                } else {
                                                    await requests.Admin.block(user.id);
                                                    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isLocked: true } : u));
                                                }
                                            }}
                                        >
                                            {user.isLocked ? "Engeli Kaldır" : "Engelle"}
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}
