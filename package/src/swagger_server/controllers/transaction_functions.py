import os

from web3 import HTTPProvider, Web3

from .contracts import funding_contract_interface

W3 = Web3(HTTPProvider('http://' + os.getenv('RPC_HOST')+':'+os.getenv('RPC_PORT')))
FUNDING_CONTRACT_ADDRESS = Web3.toChecksumAddress(os.getenv('FUNDING_CONTRACT'))

def _deposit(amount):
    funding_contract = W3.eth.contract(address=FUNDING_CONTRACT_ADDRESS, abi=funding_contract_interface['abi'])
    try:
        funding_contract.functions.deposit().transact({'from': W3.eth.accounts[0], 'value': W3.toWei(amount, 'ether')})
        return True
    except:
        return {'ERROR': 'Contract could not be funded.'}, 400

def _withdraw():
    funding_contract = W3.eth.contract(address=FUNDING_CONTRACT_ADDRESS, abi=funding_contract_interface['abi'])
    try:
        funding_contract.functions.withdraw().transact({'from': W3.eth.accounts[0]})
        return True
    except:
        return {'ERROR': 'Funds could not be withdrawn.'}, 400

def _fund(address):
    funding_contract = W3.eth.contract(address=FUNDING_CONTRACT_ADDRESS, abi=funding_contract_interface['abi'])
    try:
        funding_contract.functions.fund( Web3.toChecksumAddress(address)).transact({'from': W3.eth.accounts[0]})
        return True
    except:
        return {'ERROR': 'Address could not be funded.'}, 400

def _get_balance():
    balance = W3.eth.getBalance(account=FUNDING_CONTRACT_ADDRESS)
    return balance

def _get_cooldown(address):
    funding_contract = W3.eth.contract(address=FUNDING_CONTRACT_ADDRESS, abi=funding_contract_interface['abi'])
    try:
        cooldown = funding_contract.functions.cooldown( Web3.toChecksumAddress(address)).call()
        return cooldown
    except:
        return {'ERROR': 'Value could not be found.'}, 400

