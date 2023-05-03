from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import  hybrid_property
from validations import *

from config import db, bcrypt

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'
    
    serialize_rules = ('-created_at', '-updated_at', '-observations', '-plants')

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    #relationships

    observations = db.relationship('Observation', back_populates = 'user', cascade = 'all, delete-orphan')
    plants = association_proxy('observations', 'plant')

    #validations

    @validates('email', 'username', 'password_hash')
    def validation(self,key,value):
        if key == 'email':
            email_validation(value)
            return value
        if key == 'username':
            username_length_validation(value)
            return value
        if key == 'password_hash':
            password_length_validation(value)
            return value

    #Password Hashing Methods

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

class Observation(db.Model, SerializerMixin):

    __tablename__ = 'observations'

    serialize_rules = ('-updated_at',)

    id = db.Column(db.Integer, primary_key = True)
    location = db.Column(db.String)
    comment = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'))

    # Use Flask Uploads to associate user image with observation
    image = db.Column(db.String)

    # use created_at as a TimeStamp for when viewing was
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    #relationships

    user = db.relationship('User', back_populates = 'observations')
    plant = db.relationship('Plant', back_populates = 'observations')

    #validations

class Plant(db.Model, SerializerMixin):

    # Will need to adjust models if incorporating data from a live plant api such as:
    #       https://data.nal.usda.gov/dataset/usda-plants-database-api-r
    #       https://explorer.natureserve.org/api-docs/

    __tablename__ = 'plants'

    serialize_rules = ('-created_at','-updated_at', '-observations', '-users')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    genus = db.Column(db.String)
    species = db.Column(db.String)
    location = db.Column(db.String)
    growth_duration = db.Column(db.String)
    growth_habit = db.Column(db.String)
    description = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    #relationships

    observations = db.relationship('Observation', back_populates = 'plant', cascade = 'all, delete-orphan')
    users = association_proxy('observations', 'user')

    #validations

# Post MVP Functionality Incorporation
# class Badges(db.Model, SerializerMixin):

#     __tablename__ = 'badges'

#     serialize_rules = (,)

#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String)
#     icon = db.Column(db.String)
#     info = db.Column(db.String)

