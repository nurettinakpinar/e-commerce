export function getFavoriteIds(): number[] {
    try {
        const raw = localStorage.getItem("favorites");
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as number[];
        return [];
    } catch {
        return [];
    }
}

export function isFavorite(productId: number): boolean {
    return getFavoriteIds().includes(productId);
}

export function toggleFavorite(productId: number): boolean {
    const list = getFavoriteIds();
    const index = list.indexOf(productId);
    if (index >= 0) {
        list.splice(index, 1);
    } else {
        list.push(productId);
    }
    localStorage.setItem("favorites", JSON.stringify(list));
    return list.includes(productId);
}


