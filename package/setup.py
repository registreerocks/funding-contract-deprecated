import os

from setuptools import setup, find_packages

setup(
   name='funding_contract_API',
   version='0.1.0',
   maintainer='Sabine Bertram',
   maintainer_email='sabine.bertram@mailbox.org',
   package_dir={'': 'src'},
   packages=find_packages('src'),
   package_data={'swagger_server': ['swagger/swagger.yaml']},

   install_requires=['flask_cors', 'web3==4.4.1', 'python-dotenv', 'python-jose-cryptodome', 'pytest', 'mock'],
)
