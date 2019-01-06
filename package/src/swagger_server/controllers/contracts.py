import json

with open('../contracts/FundingContract.json', 'r') as f:
    funding_contract_interface = json.load(f)