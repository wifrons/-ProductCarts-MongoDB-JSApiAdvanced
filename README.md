************************************************************************************************
WILLIAM RODRIGUEZ - ENTREGA FINAL - API E-COMERCE
CON LOGIN USANDO AUTENTICACION JWT + MIDDLEWARE + PASSPORT + MONGOOSE + POPULATE + 
ARQUITECTURA EN CAPAS: DAO -> DTO -> SERVICE -> CONTROLLER
************************************************************************************************

-->>> El server dispone de las rutas: 

-DESDE POSTMAN:
http://localhost:3000


-->>> Metodos HTTP implementados

------------AUTHENTICATION
-> REGISTRA UN USUARIO
	POST:
		/api/mainRouter/auth/register
		BODY:
		{
			"first_name": "glendys",
			"last_name": "partida",
			"email": "glendys@gmail.com",
			"age": "60",
			"password": "123456"
		}

-> RETORNA LOS DATOS ASOCIADOS AL LOGIN
	GET:
		/api/mainRouter/auth/jwt/me
		
-> HACER LOGIN
	POST:
		/api/mainRouter/auth/jwt/login
		BODY:
		{
			"email": "glendys@gmail.com",
			"password": "123456"
		}
		
-> HACER LOGOUT
	POST:
		/api/mainRouter/auth/jwt/logout

-> RECUPERACION CONTRASENA
	POST:
		/api/mainRouter/auth/request-reset
		BODY:
		{
			"message": "Email sent for recovery."
		}

-> ESTABLECER NUEVA CONTRASENA
	POST:
		/api/mainRouter/auth/reset-password
		BODY:
		{
			"token": "c75c4d24f6b3581bdaafb52177efc9953564bd45995ae3fe6d17e9f6efee4f07",
			"newPassword": "123456"
		}
------------SESSIONS
-> RETORNA LOGIN ACTUAL(CURRENT)
	GET:
		/api/mainRouter/sessions/current
		
------------PRODUCTS

-> OBTENER TODOS LOS PRODUCTOS
	GET:
		/api/mainRouter/products/
		
-> OBTENER UN PRODUCTO ESPECIFICO
	GET:
		/api/mainRouter/products/:pid

-> INSERTAR UN PRODUCTO ESPECIFICADO
	POST:
		/api/mainRouter/products/
		BODY:
		{
		"title": "Boligrafo Papermate 09",
		"description": "Boligrafo Papermate 09",
		"code": "of-09",
		"price": 90,
		"status": 1,
		"stock": 20,
		"category": "oficina",
		"thumbnails": [
		  "https://http2.mlstatic.com/D_NQ_NP_2X_650061-MLA80166861089_102024-F.webp"
		]
		} 
		
-> ACTUALIZAR UN PRODUCTO ESPECIFICADO
	PUT:
		/api/mainRouter/products/:pid
		BODY:
		{
		"title": "Boligrafo Papermate 09",
		"description": "Boligrafo Papermate 09",
		"code": "of-09",
		"price": 900,
		"status": 1,
		"stock": 10,
		"category": "oficina",
		"thumbnails": [
		  "https://http2.mlstatic.com/D_NQ_NP_2X_650061-MLA80166861089_102024-F.webp"
		]
		} 
		
-> ELIMINAR UN PRODUCTO ESPECIFICADO
	DELETE:
		/api/mainRouter/products/:pid
		
------------CARTS

-> OBTIENE EL CARRITO ASOCIADO AL LOGIN
	GET:
		/api/mainRouter/carts/
		
-> GENERA UN CARRITO ASOCIADO AL LOGIN
	POST:
		/api/mainRouter/carts/
		
-> AGREGA UN PRODUCTO A UN CARRITO ASOCIADO AL LOGIN
	POST:
		/api/mainRouter/carts/product/:pid
		
-> ELIMINA UN PRODUCTO DEL CARRITO ASOCIADO AL LOGIN
	DELETE:
		/api/mainRouter/carts/product/:pid
		
-> ELIMINA TODOS LOS PRODUCTOS DEL CARRITO ASOCIADO AL LOGIN
	DELETE:
		/api/mainRouter/carts/

-> FINALIZAR COMPRA(GENERAR TICKET)
	POST:
		/api/mainRouter/carts/purchase

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