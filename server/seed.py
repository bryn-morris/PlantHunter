#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from faker.providers import geo, internet



# Local imports
from config import db, app
from models import User, Observation, Plant

if __name__ == '__main__':
    faker = Faker()
    faker.add_provider(geo)
    faker.add_provider(internet)

    with app.app_context():
        print('Starting seed...')

        print('Deleting Old Data...')
        User.query.delete()
        Observation.query.delete()
        Plant.query.delete()

        print('Creating Users...')

        user_list = []

        for _ in range(1,10):
            new_user = User(
                username = faker.user_name() + 'asdfg',
                password_hash = faker.word() + '@!@#$%',
                email = faker.email(),
                )
            user_list.append(new_user)

        user_list.append(User(
                                username = 'testinga',
                                password_hash = 'Password',
                                email = 'password@password.com'
                            ))
        user_list.append(User(
                                username = 'testingb',
                                password_hash = 'Password',
                                email = 'password@password.com'
                            ))


        print('Creating Observations...')

        obs_list = []

        for _ in range(1,30):
            new_ob = Observation(
                location = faker.city(),
                comment = faker.sentence(nb_words=5, variable_nb_words=True),
                image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
                user_id = randint(1,11),
                plant_id = randint(1,20)
            )

            obs_list.append(new_ob)
        
        obs_list.append(Observation(
            location = 'testing',
            comment = 'testcomment1',
            image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
            user_id = 10,
            plant_id = randint(1,20)
        ))

        obs_list.append(new_ob)

        for _ in range(1,15):
            obs_list.append(Observation(
                location = 'testing2',
                comment = 'testcomment2',
                image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
                user_id = 11,
                plant_id = randint(1,20)
            ))

            obs_list.append(new_ob)

        print('Creating Plants...')

        plant_list = []

        for _ in range(1,21):
            newPlant = Plant(
                name = faker.word(),
                image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
                genus = faker.word(),
                species = faker.word(),
                location = faker.word(),
                growth_duration = faker.word(),
                growth_habit = faker.word(),
                description = faker.sentence()
            )
            plant_list.append(newPlant)

        db.session.add_all(user_list)
        db.session.add_all(obs_list)
        db.session.add_all(plant_list)
        db.session.commit()
