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
                password = faker.word() + '@!@#$%',
                email = faker.email(),
                )
            user_list.append(new_user)


        print('Creating Observations...')

        obs_list = []

        for _ in range(1,20):
            new_ob = Observation(
                location = faker.city(),
                comment = faker.sentence(nb_words=5, variable_nb_words=True),
                user_id = randint(1,10),
                plant_id = randint(1,20)
            )

            obs_list.append(new_ob)

        print('Creating Plants...')

        plant_list = []

        for _ in range(1,20):
            newPlant = Plant(
                name = faker.word(),
                image = 'sample_image',
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
