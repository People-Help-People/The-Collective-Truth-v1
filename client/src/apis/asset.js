const API_URL = 'http://localhost:4000';

const get = async (address, network = '') => {
    const response = await fetch(`${API_URL}/explore/${address}`);
    const data = await response.json();
    return data;
}

const asset = {
    get
}

export default asset;