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
    'floor': 15,
    'hotel': 25,
    'cheap-bed': 20
};

var foods = {
    'kebap': 15,
    'frozen-pizza': 20,
    'steak': 35
};

var moods = {
    'cinema': 15,
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

var player = {
    'name': 'player',
    'day': 1,
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
    'work': works.none,
    'education': educations.none,
    'hobby': hobbies.none
};

var default_player = {
    'name': 'player',
    'day': 1,
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
    'work': works.none,
    'education': educations.none,
    'hobby': hobbies.none
};

// Get the objects from a given name
function getObjects(key) {
    if (localStorage.getItem(key)) {
        objects = JSON.parse(localStorage.getItem(key));
    } else {
        objects = default_player;
    }
    return objects;
}

function saveObjects(key, objects) {
    localStorage.setItem(key, JSON.stringify(objects));
}

function retrievePlayer() {
    player = getObjects("player");
}
function savePlayer(player) {
    saveObjects("player", player);
}

function resetPlayer() {
    savePlayer(default_player);
    retrievePlayer();
}

function isDead(player) {
    if (player.food < 1 || player.energy < 1 || player.mood < 1) {
        return true;
    } else {
        return false;
    }
}

function earn(player) {
    player.money += 2;
    player.energy -= 1;
    player.food -= 0.5;
    player.mood -= 0.5;
}

function sleep(player) {
    if (player.money >= 10) {
        player.money -= 10;
        player.energy += player.bed;
        player.mood -= 2;
        player.food -= 4;
    }
}

function eat(player) {
    if (player.money >= 3) {
        player.money -= 3;
        player.energy -= 4;
        player.food += player.foodsource;
        player.mood -= 2;
    }
}

function fun(player) {
    if (player.money >= 6) {
        player.money -= 6;
        player.energy -= 2;
        player.food -= 2;
        player.mood += player.moodsource;
    }
}
