export function toCreateProductDTO(body) {
    const { title, description, code, price, status, stock, category, thumbnails } = body ?? {};
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        throw new Error('Payload invalido');
    }
    return { title, description, code, price, status, stock, category, thumbnails };
}

export function toUpdateProductDTO(body) {
    const out = {};
    if (body?.title) out.title = body.title;
    if (body?.description) out.description = body.description;
    if (body?.code) out.code = body.code;
    if (body?.price) out.price = body.price;
    if (body?.status) out.status = body.status;
    if (body?.stock) out.stock = body.stock;
    if (body?.category) out.category = body.category;
    if (body?.thumbnails) out.thumbnails = body.thumbnails;
    return out;
}