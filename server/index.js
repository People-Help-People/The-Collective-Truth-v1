import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// ROUTES
import AssetAPI from './components/asset/assetAPI.js';

app.use('/explore', AssetAPI);


app.listen(4000, () => {
    console.log('Listening on port 4000');
})