/**
 * Created by Mathias on 17/03/2016.
 */

var rents = {
    'bike': {
        'unlock_exp': 100,
        'price': -50,
        'sellprice': 40,
        'earn_per_day': 10,
        'exp_per_day': 1,
        'max_amount': 10,
    },
    'car': {
        'unlock_exp': 1000,
        'price': -10000,
        'sellprice': 6000,
        'earn_per_day': 100,
        'exp_per_day': 5,

    },
    'apparment': {
        'unlock_exp': 10000,
        'price': -250000,
        'sellprice': 180000,
        'earn_per_day': 1000,
        'exp_per_day': 10
    }
};

var houses = {
    'homeless': 0,
    'small-appartment': 2,
    'small-house': 3,
    'villa': 4
};
var beds = {
    'floor': {
        'price': 0,
        'energy': 10,
        'food': -4,
        'mood': -4,
        'experience': 1
    },
    'hotel': {
        'price': -6,
        'energy': 20,
        'food': -3,
        'mood': -1,
        'experience': 1
    },
    'cheap-bed': {
        'price': 0,
        'energy': 15,
        'food': -3,
        'mood': -1,
        'experience': 1
    }
};

var foods = {
    'kebap': {
        'price': -3,
        'energy': -4,
        'food': 15,
        'mood': -2,
        'experience': 0.5
    },
    'frozen-pizza': {
        'price': -3.5,
        'energy': -5,
        'food': 20,
        'mood': -5,
        'experience': 0.5
    },
    'steak': {
        'price': -3.5,
        'energy': -5.5,
        'food': 35,
        'mood': -4,
        'experience': 1
    }
};

var moods = {
    'cinema': {
        'price': -6,
        'energy': -3,
        'mood': 15,
        'experience': 0.2,
        'food': -2
    },
    'computer-game': {
        'price': -0.5,
        'energy': -3,
        'mood': 30,
        'experience': 1,
        'food': -5
    }
};

var works = {
    'none': 0,
    'renting_company_worker': {
        'unlock_exp': 1500,
        'price': 0,
        'sellprice': 0,
        'earn_per_day': 50,
        'exp_per_day': 50
    },
    'renting_company_manager': {
        'unlock_exp': 5000,
        'price': 0,
        'sellprice': 0,
        'earn_per_day': 100,
        'exp_per_day': 100
    },
    'renting_company_boss': {
        'unlock_exp': 10000,
        'price': 0,
        'sellprice': 0,
        'earn_per_day': 2000,
        'exp_per_day': 400
    },
    'bike_production_company_small': {
        'unlock_exp': 4000,
        'price': -10000,
        'sellprice': 7000,
        'earn_per_day': 2000,
        'exp_per_day': 400,
        'base_production': 5,
        'bikes_per_worker': 1,
        'max_workers': 10
    },
    'bike_production_company_med': {
        'unlock_exp': 6000,
        'price': -20000,
        'sellprice': 15000,
        'earn_per_day': 2000,
        'exp_per_day': 600,
        'base_production': 10,
        'bikes_per_worker': 1.5,
        'max_workers': 50
    }
    // TODO: make option to hire new workers to earn more money (which also costs money)
};

var educations = {
    'none': {
        'progress': 0,
        'cost_per_day': 0,
        'energy': 0,
        'mood': 0,
        'experience': 0,
        'food': 0
    },
    'university': {
        'progress': 0,
        'cost_per_day': -3,
        'energy': -3,
        'mood': -3,
        'experience': 10,
        'food': -5
    }
};

var skills = {
    'none': 0,
    'drawing': {},
    'programming': {}
};

/**
 * Represents a player.
 */
var player = {
        'name': 'player',
        'day': 1,
        'experience': 0,
        'money': 100,
        'energy': 100,
        'max_energy': 100,
        'food': 100,
        'max_food': 100,
        'mood': 100,
        'max_mood': 100,
        'rent': {
            'bikes': 0,
            'cars': 0,
            'appartments': 0
        },
        'house': houses.homeless,
        'bed': beds.hotel,
        'foodsource': foods.kebap,
        'moodsource': moods.cinema,
        'company': works.none,
        'education': educations.none,
        'skill': skills.none,
        isDead: function () {
            return !!(this.food <= 0 || this.energy <= 0 || this.mood <= 0);
        }
        ,
        eat: function () {
            if (this.money >= -this.foodsource.price) {
                this.money += this.foodsource.price;
                this.energy += this.foodsource.energy;
                this.food += this.foodsource.food;
                this.mood += this.foodsource.mood;
                this.experience += this.foodsource.experience;
            }
        }
        ,
        sleep: function () {
            if (this.money >= -this.bed.price) {
                this.money += this.bed.price;
                this.energy += this.bed.energy;
                this.food += this.bed.food;
                this.mood += this.bed.mood;
                this.experience += this.bed.experience;
            }
        }
        ,
        fun: function () {
            if (this.money >= -this.moodsource.price) {
                this.money += this.moodsource.price;
                this.energy += this.moodsource.energy;
                this.food += this.moodsource.food;
                this.mood += this.moodsource.mood;
                this.experience += this.moodsource.experience;
            }
        }
        ,
        earn: function () {
            this.money += 2;
            this.energy -= 1;
            this.food -= 0.5;
            this.mood -= 0.5;
            this.experience += 2;
        }
        ,
        learn: function (study) {
            this.education = study;
            this.education.progress++;
            this.energy += this.education.energy;
            this.food += this.education.food;
            this.mood += this.education.mood;
            this.experience += this.education.experience;
        },
        work: function (what) {

        }
        ,
        getLevel: function () {
            // not necessary at the moment
        }
        ,
        buy: function (item) {
        }
        ,
        sell: function (item) {
        }
        ,
        buyBike: function () {
            if (this.money >= -rents.bike.price) {
                this.rent.bikes++;
                this.money += rents.bike.price;
            }
        },
        sellBike: function () {
            if (this.rent.bikes > 0) {
                this.rent.bikes--;
                this.money += rents.bike.sellprice;
            }
        },
        tick: function () {
            this.day++;
            this.energy -= 0.8;
            this.food -= 0.5;
            this.mood -= 0.3;
            this.experience += 0.1;
            this.money += this.education.cost_per_day;
            this.money += this.rent.bikes * rents.bike.earn_per_day;
            this.experience += rents.bike.earn_per_day;
        }
    }
    ;
var default_player = {
    'name': 'player',
    'day': 1,
    'experience': 0,
    'money': 100,
    'energy': 100,
    'max_energy': 100,
    'food': 100,
    'max_food': 100,
    'mood': 100,
    'max_mood': 100,
    'rent': {
        'bikes': 0,
        'cars': 0,
        'appartments': 0
    },
    'house': houses.homeless,
    'bed': beds.hotel,
    'foodsource': foods.kebap,
    'moodsource': moods.cinema,
    'company': works.none,
    'education': educations.none,
    'skill': skills.none,
};

/**
 * Saves given objects to HTML5 storage via JSON.
 * @param key The key where to store.
 * @param objects The objects to store.
 */
function saveObjects(key, objects) {
    localStorage.setItem(key, JSON.stringify(objects));
}

// Get the objects from a given name
function getObjects(key) {
    if (localStorage.getItem(key)) {
        objects = JSON.parse(localStorage.getItem(key));
    } else {
        objects = default_player;
    }
    return objects;
}

/**
 * Retrieves the player from the database.
 */
function retrievePlayer() {
    var data = getObjects("player");
    copyPlayerData(data, player);
}

/**
 * Saves a player in the local storage.
 * @param player
 */
function savePlayer(player) {
    saveObjects("player", player);
}

/**
 * Resets the player to the default values.
 */
function resetPlayer() {
    deletePlayer();
    savePlayer(default_player);
    retrievePlayer();
}

function deletePlayer() {
    // localStorage.clear(); // could also be used
    localStorage.removeItem("player");
}

/**
 * This function copies the data from the retrieved player to the current player object.
 * With this function, the function in the object are preserved.
 * @param from Retrieved player from HTML5 Storage
 * @param to Current player object.
 */
function copyPlayerData(from, to) {
    to.name = from.name;
    to.day = from.day;
    to.experience = from.experience;
    to.money = from.money;

    to.rents = from.rents;
    to.energy = from.energy;
    to.max_energy = from.max_energy;
    to.food = from.food;
    to.max_food = from.max_food;
    to.mood = from.mood;
    to.max_mood = from.max_mood;
    to.house = from.house;
    to.bed = from.bed;
    to.foodsource = from.foodsource;
    to.moodsource = from.moodsource;
    to.company = from.company;
    to.education = from.education;
    to.hobby = from.hobby;
}