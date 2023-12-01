const Restaurants = require('../models/restaurants.model');
const Menus = require('../models/menus.model'); // Asumiendo que este es el modelo correcto para el menú

const getRestaurantById = async (req, res, next) => {
    if (req.params?.restaurantId) {
        try {
            const { restaurantId } = req.params;
            const restaurant = await Restaurants.findById(restaurantId);
            const menu = await Menus.findOne({ restaurantId: Number(restaurantId) });

            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            // Si no se encuentra un menu
            if (!menu) {
                return res.status(404).json({ message: 'Menu not found for the provided restaurantId' });
            }
            // Combina la información del restaurante y el menu en un solo objeto para la respuesta
            const restaurantWithMenu = { ...restaurant.toObject(), menu: menu.menu };
            res.status(200).json(restaurantWithMenu);
        } catch (error) {
            // Manejo de errores con middleware de errores
            next(error); 
        }
    } else {
        res.status(400).json({ message: 'No restaurantId provided' });
    }
};

const searchRestaurants = async(req, res, next) => {
    if (req.query.search) {
        try {
            const searchTerm = req.query.search;
            const results = await Restaurants.aggregate([
                {
                $search: {
                    index: "restaurantSearch", // Asegúrate de que este es el nombre de tu índice de búsqueda de texto en Atlas
                    text: {
                    query: searchTerm,
                    path: {
                        wildcard: "*"
                    }
                    }
                }
                },
                {
                $project: {
                    _id: 1,
                    name: 1,
                    open: 1,
                    availability: 1,
                    logoURL: 1,
                    score: { $meta: "searchScore" }
                }
                }
            ]);
            res.status(200).json(results);
        } catch (error) {
            // Manejo de errores con middleware de errores
            next(error); 
        }
    } else {
        res.status(400).json({ message: 'No restaurantId provided' });
    }
}



module.exports = {
    getRestaurantById,
    searchRestaurants
};
