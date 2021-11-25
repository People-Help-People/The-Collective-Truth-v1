import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const router = express.Router();

let responsesCache = {};

router.get('/:id', cors(), async (req, res) => {
    const { id } = req.params;
    if (responsesCache[id]) {
        return res.json(responsesCache[id]);
    }
    const responseData = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=${process.env.COINMARKETCAP_API_KEY}&address=${id}`)
    const data = await responseData.json();
    let response = {
        success: true,
    }
    if (data.status.error_code === 0) {
        const tokenInfo = Object.keys(data.data).map(key => {
            const info = data.data[key];
            return {
                id: info.id,
                name: info.name,
                symbol: info.symbol,
                description: info.description,
                logo: info.logo,
                category: info.category,
                cmcURL: `https://coinmarketcap.com/currencies/${info.slug}/`,
                empty: false,
            }
        });
        response.data = tokenInfo[0];
    } else {
        response.success = false;
        response.message = data.status.error_message;
    }
    responsesCache[id] = response;
    res.json(response);
})

export default router;