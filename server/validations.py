import re

############################################################
#######            Validations for User Model
############################################################

special_characters = re.compile(r'~`!@#\$\%\^&\*\(\)-_\+=\{\}\[\]\|\\\/:\'"<>\.?')

def email_validation(email_string):
    if '@' not in email_string:
        raise ValueError('Please enter a valid email address!')

def username_length_validation(username_string):
    if len(username_string) < 8:
        raise ValueError('Please enter a username 8 characters or longer!')
    
def password_length_validation(password_string):
    if len(password_string) < 8:
        raise ValueError('Please enter a password 8 characters or longer!')
    if special_characters.search(password_string) == None:
        raise ValueError('Please enter a password with at least one Special Character')

############################################################
#######            Validations for Observations
############################################################



############################################################
#######            Validations for Plants
############################################################

