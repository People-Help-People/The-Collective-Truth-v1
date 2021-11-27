const API_URL = "https://community-audits.herokuapp.com";

const get = async (address, network = '') => {
    const response = await fetch(`${API_URL}/explore/${address}`);
    const data = await response.json();
    return data;
}

const asset = {
    get
}

export default asset;