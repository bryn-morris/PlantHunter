#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Observation, Plant

class Signup(Resource):
    
    def post(self):
        
        username = request.get_json()['username']
        password = request.get_json()['password']
        email = request.get_json()['email']

        db.session.add( User( username = username, password_hash = password, email = email,))
        db.session.commit()

        ######
        # add functionality to log in after sign in and redirect to home page after sign in->login
        ######

class Login(Resource):

    def

    if self.authenticate('password'):
                pass
            else:
                pass

class Logout(Resource):
    pass

class CurrentSession(Resource):
    pass

#######################################################
###########             API Resources
#######################################################

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CurrentSession, '/currentsession')

# class Signup(Resource):
#     def post(self):
#         data = request.get_json()
#         temp_user = User(
#             username = data['username'],
#             image = data['image'],
#             _password = data['password']
#         )
#         temp_user.password_hash = temp_user._password
#         new_password = temp_user._password

#         new_user = User(
#             username = data['username'],
#             image = data['image'],
#             _password = new_password
#         )
#         db.session.add(new_user)
#         db.session.commit()

#         return make_response(
#             {},
#             200
#         )
# api.add_resource(Signup, '/signup')
        

# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         user = User.query.filter(
#             User.username == data['username']
#         ).first()

#         password = data['password']
#         if not user:
#             return {'error': 'Must enter a valid username and password'}, 404

        
#         elif user.authenticate(password):
#             session['user_id'] = user.id
#             session_user.append(user.to_dict(rules=('dogs',)))
#             return make_response(
#                 user.to_dict(),
#                 200
#             )
#         return {'error': 'Must enter a valid username and password'}, 404
# api.add_resource(Login, '/login')

# class Logout(Resource):
#     def delete(self):
#         session.pop('user_id', None)
#         return session.get('user_id')
        

# api.add_resource(Logout, '/logout')

# class CurrentSession(Resource):
#     def get(self):

#         user = session_user[0]
#         if not user:
#             return make_response(
#                 {'error': 'User not found'},
#                 404
#             )
    
#         return make_response(
#             user,
#             200
#         )
# api.add_resource(CurrentSession, '/current-session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
