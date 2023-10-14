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

        for _ in range(1,4):
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

        for _ in range(1,14):
            new_ob = Observation(
                location = faker.city(),
                comment = faker.sentence(nb_words=5, variable_nb_words=True),
                image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
                user_id = randint(1,4),
                plant_id = randint(1,14)
            )

            obs_list.append(new_ob)
        
        # obs_list.append(Observation(
        #     location = 'testing',
        #     comment = 'testcomment1',
        #     image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
        #     user_id = 5,
        #     plant_id = 10,
        # ))
        # obs_list.append(Observation(
        #     location = 'testing',
        #     comment = 'testcomment1',
        #     image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
        #     user_id = 5,
        #     plant_id = 11,
        # ))
        obs_list.append(Observation(
            location = 'testing',
            comment = 'testcomment1',
            image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
            user_id = 5,
            plant_id = 12,
        ))
        # obs_list.append(Observation(
        #     location = 'testing',
        #     comment = 'testcomment1',
        #     image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
        #     user_id = 5,
        #     plant_id = 13,
        # ))

        # obs_list.append(new_ob)

        for _ in range(1,4):
            obs_list.append(Observation(
                location = 'testing2',
                comment = 'testcomment2',
                image = 'https://h2.commercev3.net/cdn.brecks.com/images/800/69799A.jpg',
                user_id = 5,
                plant_id = randint(8,13)
            ))

            obs_list.append(new_ob)

        print('Creating Plants...')

        plant_list = []

        for _ in range(1,7):
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
        
        plant_list.append(Plant(
            name = "Okra",
            image = "https://www.gardenia.net/storage/app/public/uploads/images/detail/WKjvH6CQ6UZtdTwTieQh6K4UVsr4fQKYPgrVPo4G.webp",
            genus = "abelmoschus",
            species = "esculentus",
            location = "Africa & Asia",
            growth_duration = "Annual, Perrenial",
            growth_habit = "Forb/herb, Shrub",
            description = "Grown for it's edible fruit, Abelmoschus esculentus (Okra) is an annual boasting hibiscus- like flowers, 2-3 in. across in shades of yellow, pink, orange and red with contrasting centers."
        ))

        plant_list.append(Plant(
            name = "Blue Horizon",
            image = "https://www.gardenia.net/storage/app/public/uploads/images/detail/DSC_3666.webp",
            genus = "ageratum",
            species = "houstonianum",
            location = "Mexico & Central America",
            growth_duration = "Annual, Perrenial",
            growth_habit = "Forb/herb",
            description = "This is a frost-tender annual boasting fluffy lavendar to purplish-blue flower clusters, up to across 3 in. across, from late spring to frost."
        ))

        plant_list.append(Plant(
            name = "'Queeny Purple' Hollyhock ",
            image = "https://www.gardenia.net/storage/app/public/uploads/images/detail/Alcea_Queeny_Purple_Bloom_20470Optimized.webp",
            genus = "alcea",
            species = "rosea",
            location = "Asia Minor, invasive across US",
            growth_duration = "Biennial, Perrenial",
            growth_habit = "Forb/herb",
            description = "Noted for its shorter stature, Hollyhock is an annual which produces sturdy spikes of large, frilly-edged, purple flowers, resembling powder puffs."
        ))

        plant_list.append(Plant(
            name = "Love-Lies-Bleeding",
            image = "https://www.gardenia.net/storage/app/public/uploads/images/detail/BFRT8URmAp32vYIaJhtUxALgZYnuaZ8rCEaOnUm3.webp",
            genus = "amaranthus",
            species = "caudatus",
            location = "India, Africa, & Peru",
            growth_duration = "Annual",
            growth_habit = "Forb/herb",
            description = "An architectural feature in the summer garden,'Love-Lies-Bleeding' is an erect, bushy annual noted for its unusual, long tassels of bright magenta flowers in summer and fall."
        ))

        plant_list.append(Plant(
            name = "Josheph\'s Coat",
            image = "https://www.gardenia.net/storage/app/public/uploads/images/detail/T7UxEvM92jaTjdWbVMusDT5lEbHmcqMqn5lpWuCX.webp",
            genus = "alternanthera",
            species = "dentata",
            location = "West Indies & Brasil",
            growth_duration = "Perennial",
            growth_habit = "Forb/herb",
            description = "Prized for its brightly coloured foiliage, Joseph\'s Coat is a tender evergreen perennial, often grown as an annual, boasting rick purple to burgundy leaves."
        ))

        plant_list.append(Plant(
            name = "False Queen Anne's",
            image = "https://www.gardenia.net/storage/app/public/uploads/images/detail/9661505_mOptimized.webp",
            genus = "ammi",
            species = "majus",
            location = "Southern Europe, Northern Africa, West & Central Asia",
            growth_duration = "Annual",
            growth_habit = "Forb/herb",
            description = "Queen Anne's Lace is an upright, hardy annual with large domed umbels, densely packed with pristine with white flowers. "
        ))

        plant_list.append(Plant(
            name = "Ornamental Onion",
            image = "https://www.gardenia.net/storage/app/public/uploads/images/detail/32131Optimized.webp",
            genus = "Allium",
            species = "firmament",
            location = "n/a",
            growth_duration = "Perential",
            growth_habit = "Bulb",
            description = "This Allium is a rather unusual Allium. Instead of having round flowerheads, it is only two-thirds of the sphere, about 4-5 in. wide and packed with star shaped, dark silvery purple flowers."
        ))

        db.session.add_all(user_list)
        db.session.add_all(obs_list)
        db.session.add_all(plant_list)
        db.session.commit()
