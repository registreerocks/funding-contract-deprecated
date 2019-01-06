from .authentication import requires_auth, requires_scope
from .transaction_functions import (_deposit, _fund, _get_balance, _get_cooldown, _withdraw)

@requires_auth
@requires_scope('admin', 'registree')
def deposit(body):
    return _deposit(body.get('amount'))

@requires_auth
@requires_scope('admin', 'registree')
def withdraw():
    return _withdraw(body.get('amount'))

@requires_auth
@requires_scope('admin', 'student', 'registree')
def fund(body):
    return _fund(body.get('address'))

@requires_auth
@requires_scope('admin', 'student', 'registree')
def get_balance():
    return _get_balance()

@requires_auth
@requires_scope('admin', 'student', 'registree')
def get_cooldown(address):
    return _get_cooldown(address)