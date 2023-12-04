## Equipo

- Andrés Aparicio Mestre
- David Mateo García Vallejo
- José David Cardona Soto
- Manuel Alejandro Gallego Jiménez
- Maria Paula Duque Muñoz

## Sobre el trabajo

- **Descripción:** iLunch es una plataforma de delivery de pedidos de comida. En el presente repositorio se presenta la capa back end de la aplicación, la cual está desarrollada bajo el framework de Express usando además una base de datos no relacional alojada en la nube con MongoDB Atlas. Se podrá interactuar con las funcionalidades principales al ejecutar el front end y el back end al tiempo.
- **Funcionalidades implementadas desde el backend:**
  - Inicio de sesión
  - Registro de usuario
  - Registro de aspirante a oferta laboral
  - Visualización de las ofertas laborales
  - Persistencia de datos
  - Añadir productos al pedido de compras
  - Eliminar productos del carrito de compras
  - editar la cantidad de unidades de productos del carrito de compras
  - Realizar el pedido de los productos en el carrito de compras
  - Edición de los datos del perfil

- **Framework:** Express 4.16.1 con Node 20.10.0
- **Librería para interactuar con MongoDB:** Mongoose 8.0.1 

## Cómo ejecutar el trabajo en su versión final

- **Versión Node:** 20.10.0

1. Ubicarse al interior del repositorio del back

2. Instalar los paquetes necesarios:

```bash
npm install
```

3. Ejecutar el servidor de desarrollo:

```bash
npm run start
```

4. Ubicarse al interior del repositorio del front

5. Instalar los paquetes necesarios:

```bash
npm install
```

6. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

7. Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado, e interactuar con las funcionalidades.
