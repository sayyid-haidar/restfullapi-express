const express = require("express");
const router = express.Router();

// Route::prefix('/product')->group(function () {
//     Route::get('/all', 'User\StoreController@product');
//     Route::get('/{id}', 'User\StoreController@detail');
//     Route::get('/search', 'User\CartController@search');

//     Route::post('/cart/add', 'User\CartController@addCart');
// });

router.get("/", (req, res, next) => {
    res.status(200).json({
        msg: "Stauts OK!"
    })
})

module.exports = router;

