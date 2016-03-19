/**
 * Created by Mathias on 17/03/2016.
 */

var houses = {
    'homeless': 0,
    'small-appartment': 2,
    'small-house': 3,
    'villa': 4
};
var beds = {
    'floor': {
        'price': -1,
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
    'cheap-bed': 20
};

var foods = {
    'kebap': {
        'price': -1,
        'energy': -4,
        'food': 15,
        'mood': -2,
        'experience': 0.5
    },
    'frozen-pizza': 20,
    'steak': 35
};

var moods = {
    'cinema': {
        'price': -6,
        'mood': 15,
        'experience': 0.2,
        'food': -2
    },
    'computer-game': 30
};

var works = {
    'none': 0
};

var educations = {
    'none': 0
};

var hobbies = {
    'none': 0
};

/**
 * Represents a player.
 * @type {{name: string, day: number, experience: number, money: number, energy: number, max_energy: number, food: number, max_food: number, mood: number, max_mood: number, house: number, bed: (beds.hotel|{price, energy, food, mood, experience}), foodsource: (foods.kebap|{price, energy, food, mood, experience}), moodsource: (moods.cinema|{price, mood, experience, food}), company: number, education: number, hobby: number, isDead: player.isDead, eat: player.eat, sleep: player.sleep, fun: player.fun, earn: player.earn, learn: player.learn, work: player.work, getLevel: player.getLevel}}
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
    'house': houses.homeless,
    'bed': beds.hotel,
    'foodsource': foods.kebap,
    'moodsource': moods.cinema,
    'company': works.none,
    'education': educations.none,
    'hobby': hobbies.none,
    isDead: function () {
        return !!(this.food < 1 || this.energy < 1 || this.mood < 1);
    },
    eat: function () {
        if (this.money >= -this.foodsource.price) {
            this.money += this.foodsource.price;
            this.energy += this.foodsource.energy;
            this.food += this.foodsource.food;
            this.mood += this.foodsource.mood;
            this.experience += this.foodsource.experience;
        }
    },
    sleep: function () {
        if (this.money >= -this.bed.price) {
            this.money += this.bed.price;
            this.energy += this.bed.energy;
            this.food += this.bed.food;
            this.mood += this.bed.mood;
            this.experience += this.bed.experience;
        }
    },
    fun: function () {
        if (this.money >= -this.moodsource.price) {
            this.money += this.moodsource.price;
            this.energy += this.moodsource.energy;
            this.food += this.moodsource.food;
            this.mood += this.moodsource.mood;
            this.experience += this.moodsource.experience;
        }
    },
    earn: function () {
        this.money += 2;
        this.energy -= 1;
        this.food -= 0.5;
        this.mood -= 0.5;
        this.experience += 2;
    },
    learn: function (study) {

    },
    work: function (what) {

    },
    getLevel: function () {

    }

};

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
    'house': houses.homeless,
    'bed': beds.hotel,
    'foodsource': foods.kebap,
    'moodsource': moods.cinema,
    'company': works.none,
    'education': educations.none,
    'hobby': hobbies.none
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
    savePlayer(default_player);
    retrievePlayer();
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