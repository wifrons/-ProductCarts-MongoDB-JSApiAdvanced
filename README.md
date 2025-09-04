************************************************************************************************
WILLIAM RODRIGUEZ - ENTREGA 01 - API MANEJADOR DE PRODRUCTOS Y CARRITOS 
CON LOGIN USANDO MONGOOSE + POPULATE + AUTENTICACION JWT + MIDDLEWARE + PASSPORT
************************************************************************************************

-->>> El server dispone de las rutas: 

-DESDE POSTMAN:
http://localhost:3000/
http://localhost:3000/auth/
http://localhost:3000/products/
http://localhost:3000/carts/ 
http://localhost:3000/api/sessions/

-->>> Metodos HTTP implementados

*************************************************AUTHENTICATION
//RETORNA LOS DATOS ASOCIADOS AL LOGIN
GET  -> http://localhost:3000/auth/jwt/me

//REGISTRA UN USUARIO.
POST -> http://localhost:3000/auth/register
    BODY:
        {
            "first_name": "sara",
            "last_name": "rodriguez",
            "email": "sara@gmail.com",
            "age": "60",
            "password": "sara"
        }

//HACER LOGIN
POST -> http://localhost:3000/auth/jwt/login
    BODY:
        {
            "email": "sara@gmail.com",
            "password": "sara"
        }

//HACER LOGOUT
POST -> http://localhost:3000/auth/jwt/logout

*************************************************CARTS
// OBTIENE EL CARRITO ASOCIADO AL LOGIN.
GET  -> http://localhost:3000/carts/

// GENERA UN CARRITO ASOCIADO AL LOGIN.
POST -> http://localhost:3000/carts/

//AGREGA UN PRODUCTO A UN CARRITO ASOCIADO AL LOGIN.
POST -> http://localhost:3000/carts/product/:pid

//ELIMINA UN PRODUCTO DEL CARRITO ASOCIADO AL LOGIN
DELETE -> http://localhost:3000/carts/product/:pid

//ELIMINA TODOS LOS PRODUCTOS DEL CARRITO ASOCIADO AL LOGIN
DELETE -> http://localhost:3000/carts/

*************************************************PRODUCTS
//OBTENER TODOS LOS PRODUCTOS
GET  -> http://localhost:3000/products/

//OBTENER UN PRODUCTO ESPECIFICO
GET  -> http://localhost:3000/products/:pid

//INSERTAR UN PRODUCTO ESPECIFICADO
POST  -> http://localhost:3000/products/
    BODY:
        {
            "title": "Boligrafo Papermate 07",
            "description": "Boligrafo Papermate 07",
            "code": "of-07",
            "price": 70,
            "status": 1,
            "stock": 20,
            "category": "oficina",
            "thumbnails": [
            "https://http2.mlstatic.com/D_NQ_NP_2X_650061-MLA80166861089_102024-F.webp"
            ]
        } 

//ACTUALIZAR UN PRODUCTO ESPECIFICADO
PUT  -> http://localhost:3000/products/:pid
    BODY:
        {
            "title": "Boligrafo Papermate 01",
            "description": "Boligrafo Papermate 01",
            "code": "of-01",
            "price": 10,
            "status": 1,
            "stock": 20,
            "category": "oficina",
            "thumbnails": [
            "https://http2.mlstatic.com/D_NQ_NP_2X_667501-MLU54959898837_042023-F.webp"
            ]
        } 

//ELIMINAR UN PRODUCTO ESPECIFICADO
DELETE  -> http://localhost:3000/products/:pid

*************************************************SESSIONS
GET  -> http://localhost:3000/api/sessions/current


************************************************ EJEMPLO MODELO JSON DE PRODUCTS
{
    "status": "success",
    "response": [
        {
            "_id": "68b7a71f316e0d47f4998450",
            "title": "ImpresoraXXXXXXXX",
            "description": "ImpresoraXXXXXXXX",
            "code": "xxxx",
            "price": 1020,
            "status": 1,
            "stock": 20,
            "category": "computacion",
            "thumbnails": [
                "https://http2.mlstatic.com/D_NQ_NP_2X_940540-MLU69594733495_052023-F.webp"
            ]
        },
        {
            "_id": "68b7aa0ed4a2356616e9b2b1",
            "title": "Boligrafo Papermate 07",
            "description": "Boligrafo Papermate 07",
            "code": "of-07",
            "price": 70,
            "status": 1,
            "stock": 20,
            "category": "oficina",
            "thumbnails": [
                "https://http2.mlstatic.com/D_NQ_NP_2X_650061-MLA80166861089_102024-F.webp"
            ]
        }
    ]
}

//************************************************ EJEMPLO MODELO JSON DE CARTS

{
    "message": "Carrito encontrado",
    "cart": {
        "_id": "68b7a74b316e0d47f4998455",
        "user": "68b7a6e6316e0d47f499844c",
        "products": []
    }
}