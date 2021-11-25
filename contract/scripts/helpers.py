from brownie import accounts, config, network
import os

LOCAL_DEV_ENVS = ["development", "ganache-local"]
FORKED_ENVS = ["mainnet-fork-dev"]
USD_DECIMAL = 8
USD_VALUE = 4000 * 10 ** 8

def get_account():
    if network.show_active() in LOCAL_DEV_ENVS + FORKED_ENVS:
        account = accounts[0]
    else:
        account = accounts.add(config["wallets"]["from_key"])
        # account = accounts.add(os.getenv("PRIVATE_KEY"))
        # account = accounts.load("test")
    return account